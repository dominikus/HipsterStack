/* eslint-disable no-param-reassign, no-underscore-dangle */

import React, { Component } from 'react';

import { observer, PropTypes } from 'mobx-react';
import { observe, action } from 'mobx';

import { scaleLinear, extent } from 'd3';

import { TweenMax, Power2 } from 'gsap';

import ViewModelCollection from '../data/ViewModelCollection';
import dataAPI from '../data/dataAPI';

import View from './View';
import viewModelTemplate from '../data/viewModelTemplate';


@observer
class ContainerComponent extends Component {

  static propTypes = {
    W: React.PropTypes.number,
    H: React.PropTypes.number,
    SCALE_FACTOR: React.PropTypes.number,
    padding: React.PropTypes.number,
    models: PropTypes.observableArrayOf(React.PropTypes.object),
  }

  static defaultProps = {
    W: 600,
    H: 400,
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
  }

  updateSelection(id) {
    // console.log('update selection', id);
    this.viewModels.forEach((item) => {
      item.selected = (item.id === id);
    });
  }

  @action updateData() {
    const vms = this.viewModels;

    // visual mapping
    const SIZE = Math.min(this.props.W, this.props.H) * this.props.SCALE_FACTOR;
    const xScale = scaleLinear()
      .domain(extent(vms, n => n.__data.x))
      .range([
        ((this.props.W - SIZE) / 2) + (this.props.padding * SIZE),
        ((this.props.W - SIZE) / 2) + ((1 - this.props.padding) * SIZE),
      ]);
    const yScale = scaleLinear()
      .domain(extent(vms, n => n.__data.y))
      .range([
        ((this.props.H - SIZE) / 2) + (this.props.padding * SIZE),
        ((this.props.H - SIZE) / 2) + ((1 - this.props.padding) * SIZE),
      ]);

    // property updates
    vms.forEach((vm) => {
      const x = xScale(vm.__data.x);
      const y = yScale(vm.__data.y);

      const { label } = vm.__data;
      TweenMax.killTweensOf(vm);

      // direct changes
      vm.update({ label });

      // animated changes
      TweenMax.to(vm, 1, {
        x,
        y,
        ease: Power2.easeOut,
      });
    });
  }

  render() {
    return (
      <div key="container-component">
        <View
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
