/* eslint-disable no-param-reassign, no-console, no-underscore-dangle, react/no-unused-prop-types */

import React, { Component } from 'react';
import { observe, action, reaction } from 'mobx';
// import { scaleLinear, extent } from 'd3';
// import { TweenMax, Power2 } from 'gsap';
import { forceSimulation, forceCenter, forceCollide, forceX, forceY } from 'd3';

import ViewModelCollection from '../data/ViewModelCollection';
import dataAPI from '../data/dataAPI';

import CanvasView from './CanvasView';
import PixiView from './PixiView';
import DivView from './DivView';
import viewModelTemplate from '../data/viewModelTemplate';

class ContainerComponent extends Component {

  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    SCALE_FACTOR: React.PropTypes.number,
    padding: React.PropTypes.number,
    models: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  static defaultProps = {
    width: 800,
    height: 600,
    SCALE_FACTOR: 1,
    padding: 0.05,
    models: [],
  }

  constructor() {
    super();

    this.viewModelCollection = new ViewModelCollection([], viewModelTemplate);

    observe(dataAPI, 'selectedItem', () => {
      this.updateSelection(dataAPI.selectedItemId);
    });

    reaction(() => dataAPI.itemsHash, () => {
      this.updateViewModels();
      this.updateLayout();
    });
  }

  componentWillMount() {
    console.log('ContainerComponent.componentWillMount');
    const fc = forceCenter(400, 300);
    this.sim = forceSimulation()
    .force('center', fc)
    .force('collide', forceCollide().radius(20).strength(0.1))
    .alphaDecay(0.001)
    .alphaMin(0.1);
  }

  updateViewModels() {
    console.log('updateViewModels', dataAPI.items);
    this.viewModelCollection.updateModels(dataAPI.items);
  }

  updateSelection(id) {
    // console.log('update selection', id);
    this.viewModels.forEach((item) => {
      item.selected = (item.id === id);
    });
  }

  @action updateLayout() {
    console.log('ContainerComponent.updateLayout');

    const { width, height } = this.props;
    const vms = this.viewModelCollection.viewModels;

    this.sim.force('x', forceX(d => ((d.index * 200) % width)).strength(0.01));
    this.sim.force('y', forceY(d => ((d.index * 400) % height)).strength(0.01));
    this.sim.nodes(vms, ({ id }) => id);

    this.sim.restart(1);

    // // visual mapping
    // const SIZE = Math.min(W, H) * SCALE_FACTOR;
    // const xScale = scaleLinear()
    //   .domain(extent(vms, n => n.__data.x))
    //   .range([
    //     ((W - SIZE) / 2) + (padding * SIZE),
    //     ((W - SIZE) / 2) + ((1 - padding) * SIZE),
    //   ]);
    // const yScale = scaleLinear()
    //   .domain(extent(vms, n => n.__data.y))
    //   .range([
    //     ((H - SIZE) / 2) + (padding * SIZE),
    //     ((H - SIZE) / 2) + ((1 - padding) * SIZE),
    //   ]);

    // property updates
    vms.forEach((vm) => {
      // const x = xScale(vm.__data.x);
      // const y = yScale(vm.__data.y);

      const { label } = vm.__data;
      // TweenMax.killTweensOf(vm);

      // direct changes
      vm.update({ label });

      // animated changes
      // TweenMax.to(vm, 1, {
      //   x,
      //   y,
      //   ease: Power2.easeOut,
      // });
    });
  }

  render() {
    console.log('ContainerComponent.render');

    const { viewModels } = this.viewModelCollection;
    const { width, height } = this.props;

    return (
      <div key="container-component">
        { false && <CanvasView
          key="canvas-view"
          viewModels={viewModels}
          width={width}
          height={height}
          setSelectedItemId={(id) => { dataAPI.selectedItemId = id; }}
        />
        }
        { false && <PixiView
          key="pixi-view"
          viewModels={viewModels}
          width={width}
          height={height}
          setSelectedItemId={(id) => { dataAPI.selectedItemId = id; }}
        />
        }
        {
          true && <DivView
            key="div-view"
            viewModels={viewModels}
            width={width}
            height={height}
            setSelectedItemId={(id) => { dataAPI.selectedItemId = id; }}
          />
        }
      </div>
    );
  }
}

export default ContainerComponent;
