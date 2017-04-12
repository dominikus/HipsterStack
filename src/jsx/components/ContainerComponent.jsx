/* eslint-disable no-param-reassign, no-console, no-underscore-dangle, react/no-unused-prop-types */

import React, { Component } from 'react';
import { observe, action } from 'mobx';
import { scaleLinear, extent } from 'd3';
import { TweenMax, Power2 } from 'gsap';

import ViewModelCollection from '../data/ViewModelCollection';
import dataAPI from '../data/dataAPI';
import View from './View';
import viewModelTemplate from '../data/viewModelTemplate';

class ContainerComponent extends Component {

  static propTypes = {
    W: React.PropTypes.number,
    H: React.PropTypes.number,
    SCALE_FACTOR: React.PropTypes.number,
    padding: React.PropTypes.number,
    models: React.PropTypes.arrayOf(React.PropTypes.object),
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

    this.viewModelCollection = new ViewModelCollection(this.models, viewModelTemplate);

    observe(dataAPI, 'selectedItem', () => {
      this.updateSelection(dataAPI.selectedItemId);
    });
  }

  componentWillMount() {
    console.log('ContainerComponent.componentDidMount');
    this.updateModels(this.props);
  }

  componentWillUpdate(nextProps) {
    console.log('ContainerComponent.componentWillUpdate');
    this.updateModels(nextProps);
  }

  @action updateModels(props) {
    console.log('updateModels', props.models);
    this.viewModelCollection.updateModels(props.models);
    this.updateData(props);
  }

  updateSelection(id) {
    // console.log('update selection', id);
    this.viewModels.forEach((item) => {
      item.selected = (item.id === id);
    });
  }


  @action updateData(props) {
    console.log('ContainerComponent.updateData');
    const { W, H, SCALE_FACTOR, padding } = props;
    const vms = this.viewModelCollection.viewModels;

    // visual mapping
    const SIZE = Math.min(W, H) * SCALE_FACTOR;
    const xScale = scaleLinear()
      .domain(extent(vms, n => n.__data.x))
      .range([
        ((W - SIZE) / 2) + (padding * SIZE),
        ((W - SIZE) / 2) + ((1 - padding) * SIZE),
      ]);
    const yScale = scaleLinear()
      .domain(extent(vms, n => n.__data.y))
      .range([
        ((H - SIZE) / 2) + (padding * SIZE),
        ((H - SIZE) / 2) + ((1 - padding) * SIZE),
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
    console.log('ContainerComponent.render');

    const { viewModels } = this.viewModelCollection;
    const { W, H } = this.props;

    return (
      <div key="container-component">
        <View
          key="view"
          viewModels={viewModels}
          width={W}
          height={H}
          setSelectedItemId={(id) => { dataAPI.selectedItemId = id; }}
        />
      </div>
    );
  }
}

export default ContainerComponent;
