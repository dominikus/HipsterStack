import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {observer} from 'mobx-react'
import {autorun, observe, observable, action, computed} from 'mobx'

import * as d3 from 'd3'

import {scaleLinear, scaleSqrt, extent, zoom, select, event, hcl} from 'd3'

import {TweenMax} from 'gsap'

import ViewModelCollection from 'data/ViewModelCollection'
import dataAPI from 'data/dataAPI'
import {uiState} from 'lima/core'

import ItemMapView from './ItemMapView'
import itemViewModelTemplate from './ItemViewModelTemplate'


export const W = 600
export const H = 400
let SCALE_FACTOR = 1
let padding = .05

@observer
class ItemMapComponent extends Component {
	@observable xTranslate = 0
	@observable yTranslate = 0
	@computed get translate() {
		return [this.xTranslate, this.yTranslate]
	}

	@observable zoom = 0
	@observable isAnimating = false
	constructor(){
		super()

		observe(dataAPI, 'selectedItem', () => {
			this.updateSelection(dataAPI.selectedItemId)
		})

	}

	componentWillMount() {
		// initial update
		this.viewModelCollection = new ViewModelCollection(this.props.models, itemViewModelTemplate)
		this.viewModels = this.viewModelCollection.viewModels
		observe(this.viewModels, e=>this.updateData(), true)
	}

	updateSelection(id) {
		console.log('update selection', id)
		this.viewModels.forEach(item => {
			item.selected = (item.id == id)
		})
	}

	@action updateData() {

		const vms = this.viewModels

		// visual mapping
		const SIZE = Math.min(W, H) * SCALE_FACTOR
		const xScale = scaleLinear().domain(extent(vms, n=>n.__data.x)).range([(W-SIZE)/2 + padding*SIZE, (W-SIZE)/2 +(1-padding)*SIZE])
		const yScale = scaleLinear().domain(extent(vms, n=>n.__data.y)).range([(H-SIZE)/2 + padding*SIZE, (H-SIZE)/2 + (1-padding)*SIZE])

		// property updates
		vms.forEach(vm=>{

			const x = xScale(vm.__data.x)
			const y = yScale(vm.__data.y)

			const {label} = vm.__data
			TweenMax.killTweensOf(vm)

			// direct changes
			vm.update({label})

			// animated changes
			TweenMax.to(vm, 1, {
				x,
				y,
				ease: Power2.easeOut,
			})
		})
	}

	render() {
		console.log('ItemMapComponent render')

		return (

			<div ref='view' key='item-map-component'>
				<ItemMapView
					key='item-map-view'
					viewModels={this.viewModels}
					scale={this.zoom}
					translate={this.translate}
					width={W}
					height={H}
					setSelectedItemId={id => uiState.selectedItemId = id}
				/>
				</div>
		)
	 }


	 componentDidMount(prevProps, prevState) {

			select(this.refs.view).call(
				zoom()
				.on('zoom', action((d)=>{
					this.zoom = event.transform.k
					this.xTranslate = event.transform.x
					this.yTranslate = event.transform.y
				}))
				// .on('start', ()=> this.setState({zooming: true}))
				// .on('end', ()=> this.setState({zooming: false}))
			)
		}
}

export default ItemMapComponent
