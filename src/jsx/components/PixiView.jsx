/* eslint-disable no-console no-underscore-dangle no-use-before-define */

import React, { Component } from 'react';
import { autorun } from 'mobx';
import * as PIXI from 'pixi.js';

import { rgbToPixiColor, circleGraphic } from '../util/pixiTools';

class PixiView extends Component {
  static propTypes = {
    viewModels: React.PropTypes.arrayOf(React.PropTypes.object),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    setSelectedItemId: React.PropTypes.func,
  }

  static defaultProps = {
    viewModels: { enter: [], update: [], exit: [], all: [] },
    width: 1200,
    height: 800,
    setSelectedItemId: () => {},
  }

  componentDidMount() {
    const { width, height } = this.props;

    const p = {
      antialias: true,
      transparent: true,
      backgroundColor: 0xFFFFFF,
      resolution: 1,
      view: this.canvas,
      autoResize: true,
    };

    this.pixiApp = new PIXI.Application(width, height, p);
    this.pixiApp.start();

    this.stage = this.pixiApp.stage;
    this.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);
    this.stage.interactive = true;

    this.updateSprites(this.props.viewModels);
  }

  componentWillUpdate(nextProps) {
    this.updateSprites(nextProps.viewModels);
  }

  updateSprites(viewModels) {
    // console.log('view.updateSprites');

    viewModels.filter(vm => vm.lifeCycleState === 'enter').forEach((vm) => {
      this.createSprite(vm, this.props.setSelectedItemId);
    });
    viewModels.filter(vm => vm.lifeCycleState === 'exit').forEach((vm) => {
      this.removeSprite(vm);
    });
  }


  sprites = [];

  createSprite(vm, clickAction, hoverAction) {
    const ns = new ItemSprite(vm, clickAction, hoverAction);
    this.sprites.push(ns);
    this.stage.addChild(ns);
  }

  // TODO: removing does not really work yet
  removeSprite(vm) {
    const ns = find(this.sprites, x => x.viewModel === vm);
    this.stage.removeChild(ns);
    this.sprites.splice(this.sprites.indexOf(ns), 1);
  }

  render() {
    const { width, height } = this.props;

    return (
      <div>
        <canvas
          key="pixi"
          width={width}
          height={height}
          ref={ref => (this.canvas = ref)}
        />
      </div>
    );
  }
}

class ItemSprite extends PIXI.Container {
  constructor(vm, clickAction, hoverAction) {
    super();
    this.viewModel = vm;
    this.clickAction = clickAction;
    this.hoverAction = hoverAction;
    this.setUp();

    autorun(() => this.updateAttributes());
    this.updateAttributes();

    this.interactive = true;
  }

  setUp() {
    this.dot = circleGraphic({
      fill: 0x000000,
      radius: 4,
      parent: this,
    });
  }

  updateAttributes() {
    const { x, y, color } = this.viewModel;
    this.position.set(x, y);

    if (color) {
      this.dot.tint = rgbToPixiColor(color);
    }
  }

  // updateView(scale, translate){
  //   this.scale.set(Math.sqrt(1/scale));
  // }

  click(event) {
    event.stopPropagation();
    this.clickAction(this.viewModel.id);
  }

  // mouseover(event){
  //   event.stopPropagation();
  //   console.log(this.viewModel.id, this.viewModel.__data);
  //   this.hoverAction(this.viewModel.legId);
  //   // uiState.playing = false;
  // }

  // mouseout(event){
  //   event.stopPropagation();
  //   this.hoverAction();
  //   // uiState.playing = true;
  // }
}

export default PixiView;
