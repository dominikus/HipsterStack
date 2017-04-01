/* eslint-disable no-param-reassign, no-underscore-dangle */

import React, { Component } from 'react';

import { observer, PropTypes } from 'mobx-react';
import { observe, action } from 'mobx';

import { forceSimulation, forceCenter, forceCollide, forceX, forceY } from 'd3';

// import { TweenMax, Power2 } from 'gsap';

import ViewModelCollection from '../data/ViewModelCollection';
import dataAPI from '../data/dataAPI';
import uiState from '../state/uiState';
import PixiView from './PixiView';
import viewModelTemplate from '../data/viewModelTemplate';


@observer
class ContainerComponent extends Component {

  static propTypes = {
    W: React.PropTypes.number,
    H: React.PropTypes.number,
    // SCALE_FACTOR: React.PropTypes.number,
    // padding: React.PropTypes.number,
    models: PropTypes.observableArrayOf(React.PropTypes.object),
  }

  static defaultProps = {
    W: 1200,
    H: 800,
    SCALE_FACTOR: 1,
    padding: 0.05,
    models: [],
  }

  constructor() {
    super();

    observe(dataAPI, 'selectedItem', () => {
      this.updateSelection(dataAPI.selectedItemId);
    });
  }

  componentWillMount() {
    // initial update
    this.viewModelCollection = new ViewModelCollection(this.props.models, viewModelTemplate);
    this.viewModels = this.viewModelCollection.viewModels;
    observe(this.viewModels, () => this.updateData(), true);
    // const vms = this.viewModels
      // console.log("x", vms[0].x, vms[0].y);
  }

  updateSelection(id) {
    // console.log('update selection', id);
    this.viewModels.forEach((item) => {
      item.selected = (item.id === id);
    });
  }

  @action updateData() {
    const vms = this.viewModels;
    vms.forEach((v) => {
      v.label = v.__data.label;
    });
    // const fmb = forceManyBody().strength(1).distanceMin(5);
    const fc = forceCenter(this.props.W / 2, this.props.H / 2)
    this.sim = forceSimulation(vms)
    .force('center', fc)
    .force('collide', forceCollide().radius(10).strength(0.5))
    // .force('charge', fmb)
    .force('x', forceX().x(n => 200 * (n.index % 5)))
    .force('y', forceY().y(n => 200 * (n.index % 4)))
    .on('tick', () => {});

    // observe(uiState.mouse, "x", ()=>{
    //   fc.x(uiState.mouse.x)
    //   this.sim.alpha(1).restart()
    // })
  }

  render() {
    return (
      <div key="container-component">
        <PixiView
          key="view"
          viewModels={this.viewModels}
          width={this.props.W}
          height={this.props.H}
          setSelectedItemId={(id) => { dataAPI.selectedItemId = id; }}
        />
      </div>
    );
  }
}

export default ContainerComponent;
