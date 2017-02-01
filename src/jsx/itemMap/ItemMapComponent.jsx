import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {observer} from 'mobx-react';
import {autorun, observe, observable} from 'mobx';

import * as d3 from 'd3';

import {scaleLinear, scaleSqrt, extent, zoom, select, event, hcl} from 'd3';
import {keyBy, assign,compact} from 'lodash';

import {TweenMax} from 'gsap';

import {viewModel} from 'data/ViewModels';
import dataAPI from 'data/dataAPI';
import uiState from "state/uiState";

import ItemMapView, {itemViewModelTemplate} from "./ItemMapView";

export const W       = 600;
export const H       = 400;
let SCALE_FACTOR = 1;
let padding = .05;

@observer
class ItemMapComponent extends Component {

	@observable viewModels = [];
	constructor(){
		super();

		this.state = {
			viewModels: [],
			scale: 1,
			translate: [0,0],
			isAnimating: false
			// zooming: false
		}

		// any uiState change triggers data update
		// could be more fine grained
		autorun(() => {
			this.updateData();
		});

		autorun(() => {
			console.log("this.viewModels", this.viewModels);
		});

		autorun(() => {
			console.log("selection change");
			this.updateSelection(dataAPI.selectedItem);
		});
	}

	componentWillMount() {
		// initial update
		this.updateData();
	}

	updateSelection() {
		console.log("update selection", dataAPI.selectedItem);
		this.viewModels.forEach(item => {
			item.selected = item.id === (dataAPI.selectedItem || {}).id;
		});
	}

	updateData() {

		let {items} = this.props;
		console.log("ItemMapComponent data update", items)

		let SIZE = Math.min(W, H) * SCALE_FACTOR;
		let xScale = scaleLinear().domain(extent(items, n=>n.x)).range([(W-SIZE)/2 + padding*SIZE, (W-SIZE)/2 +(1-padding)*SIZE]);
		let yScale = scaleLinear().domain(extent(items, n=>n.y)).range([(H-SIZE)/2 + padding*SIZE, (H-SIZE)/2 + (1-padding)*SIZE]);

		let scaleBy = (n)=> 1;
		let sizeScale = scaleLinear().domain(extent(items, scaleBy)).range([1, 1]);

		let itemColor = (n)=> "#999999";

		switch(uiState.currentView){
			case "default":
				break;
		}
		// let animDuration = 2;

		// assumption - node list doesn't change…
		items.forEach((n)=>{

			const x            = xScale(n.x);
			const y            = yScale(n.y);
			// n.screenPosition = {x,y};

			const {id, label} = n;
			let scale = sizeScale(scaleBy(n));
			n.scale = scale;

			const nodeCol = "#999999";
			const color = d3.hsl(nodeCol).rgb();

			const vm = viewModel(n, itemViewModelTemplate);
			// TweenMax.killTweensOf(vm);

			// direct changes
			vm.update( {id, label});

			// animated changes
			TweenMax.to(vm, 2, {
				x,
				y,
				ease: Elastic.easeOut,
			});
		});

		this.viewModels.replace(items.map(n=> viewModel(n)));

		// this.animateForTimeSpan(animDuration);
	}

	// animateForTimeSpan(secs){
	// 	this.setState({isAnimating: true})
	// 	TweenMax.killTweensOf(this);
	// 	TweenMax.to(this, secs, {
	// 		onComplete: ()=> {
	// 			this.setState({isAnimating: false});
	// 		}
	// 	});
	// }

	render() {
		console.log("ItemMapComponent render")
		return (

			<div ref="view" key="item-map-component">
				<ItemMapView
					key="item-map-view"
					viewModels={this.viewModels}
					scale={this.state.scale}
					translate={this.state.translate}
					continuousUpdates={this.state.isAnimating}
					// zooming={this.state.zooming}
					width={W}
					height={H}
				/>
				</div>
		);
	 }

	 componentDidMount(prevProps, prevState) {

	 	// set up zoom behavior
		select(this.refs.view).call(
			zoom()
			.on("zoom", (d)=>{
				this.setState({
					scale: event.transform.k,
					translate: [event.transform.x, event.transform.y]
				})
			})
			// .on("start", ()=> this.setState({zooming: true}))
			// .on("end", ()=> this.setState({zooming: false}))
		);
	 }
};

export default ItemMapComponent;
