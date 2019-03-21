import React from 'react';
import { observer } from 'mobx-react';
import {
  autorun, observable, computed, toJS, action,
} from 'mobx';
import { now } from 'mobx-utils';
import { range } from 'lodash';
import * as PIXI from 'pixi.js';
import particle from '../../assets/particle.png';
import { hexToPixiColor, circleGraphic } from '../util/pixiTools';

@observer
class DynamicMapPixi extends React.Component {
  displayItems = new Map();

  createStage() {
    const { width, height } = this.props;

    const p = {
      antialias: true,
      transparent: true,
      // backgroundColor: 0xffffff,
      resolution: window.devicePixelRatio,
      view: this.mount,
      autoResize: true,
    };

    this.pixiApp = new PIXI.Application(width, height, p);
    // this.pixiApp.start();

    const { stage } = this.pixiApp;
    stage.hitArea = new PIXI.Rectangle(0, 0, width, height);
    stage.interactive = true;

    return stage;
  }

  updateStage() {}

  createDisplayItem(d, clickAction = null, hoverAction = null) {
    const ns = new ItemSprite(d, clickAction, hoverAction);
    this.stage.addChild(ns);
    return ns;
  }

  displayItemFor(d) {
    if (!this.displayItems.has(d)) {
      this.displayItems.set(d, this.createDisplayItem(d));
    }
    return this.displayItems.get(d);
  }

  tick(now) {
    this.updateStage();
    this.props.data.forEach(d => {
      this.displayItemFor(d).updateAttributes();
    });
  }

  componentDidUpdate(prevProps) {}

  componentDidMount() {
    this.stage = this.createStage();
    autorun(() => this.tick(now('frame')));
  }

  render() {
    const { data, width, height } = this.props;
    console.log('render');
    return (
      <canvas
        key="PIXI"
        style={{ width, height, display: 'block' }}
        width={width}
        height={height}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

class ItemSprite extends PIXI.Container {
  constructor(vm, clickAction, hoverAction) {
    super();
    this.viewModel = vm;
    // this.clickAction = clickAction;
    // this.hoverAction = hoverAction;
    this.setUp();

    // this.interactive = true;
  }

  setUp() {
    // this.trailPoints = range(10).map(() => new PIXI.Point());

    // this.trail = new PIXI.mesh.Rope(
    //   PIXI.Texture.fromImage(particle),
    //   this.trailPoints,
    // );
    // this.trail.alpha = 0.5;
    // this.trail.scale.set(0.25, 0.25);
    // this.trail.scale = 10;
    // this.trail.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    // this.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    // this.addChild(this.trail);

    this.dot = circleGraphic({
      fill: 0xffffff,
      radius: 1,
      parent: this,
    });
  }

  updateAttributes() {
    const {
      x, y, color, radius, trail,
    } = this.viewModel;

    this.position.set(x, y);

    this.scale.set(this.scale.x + (radius - this.scale.x) * 0.05);

    if (color) {
      this.dot.tint = hexToPixiColor(color);
      // this.trail.tint = hexToPixiColor(color);
    }

    // this.trailPoints.forEach((p, i) => (i < trail.length ? p.set(trail[i].x - x, trail[i].y - y) : p.set(0, 0)));
    // // console.log(trail.length && trail[0]);
    // this.trail.refresh();
    // this.trail.refreshVertices();
  }

  // updateView(scale, translate){
  //   this.scale.set(Math.sqrt(1/scale));
  // }

  // click(event) {
  //   event.stopPropagation();
  //   this.clickAction(this.viewModel.id);
  // }

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
export default DynamicMapPixi;
