/* eslint-disable */

import React, { Component } from 'react';
import { observe, autorun } from 'mobx';
import { PropTypes } from 'mobx-react';
import { find } from 'lodash';
import * as PIXI from 'pixi.js';

import uiState from '../state/uiState';
import { rgbToPixiColor, circleGraphic } from '../util/pixiTools';

export const BG_COL = 0xFFFFFF;

class PixiView extends Component {
  static propTypes = {
    viewModels: PropTypes.observableArrayOf(React.PropTypes.object),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    scale: React.PropTypes.number,
    translate: React.PropTypes.arrayOf(React.PropTypes.number),
    setSelectedItemId: React.PropTypes.func,
    clickAction: React.PropTypes.func,
    hoverAction: React.PropTypes.func,
  }

  static defaultProps = {
    viewModels: [],
    width: 600,
    height: 400,
    scale: 1,
    translate: [0,0],
    setSelectedItemId: () => {},
    clickAction: () => {},
    hoverAction: () => {},
  }

  render() {
    const { width, height } = this.props;

    return (
      <div style={{"position": "absolute"}}>
        <canvas
          key='pixi'
          width={width}
          height={height}
          ref='canvas'
        />
      </div>
    );
  }

  componentDidMount() {
    const { viewModels, scale, translate, width, height } = this.props;

    const p = {
      'antialias': true,
      'transparent': true,
      'backgroundColor': BG_COL,
      'resolution': 2,
      'view': this.refs.canvas,
      'autoResize': true,
    };

    this.pixiApp = new PIXI.Application(width, height, p);
    this.pixiApp.start();

    this.stage = this.pixiApp.stage;
    this.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);
    this.stage.interactive = true;

    this.itemSprites = [];

    observe(viewModels, (x)=>{

      x.added.forEach(vm=>{
        // add item
        this.createSprite(vm, this.props.clickAction, this.props.hoverAction)
      });

      x.removed.forEach(vm=>{
        // remove item
        this.removeSprite(vm)
      });

    }, true)
    this.updateView();
  }

  createSprite(vm, clickAction, hoverAction){
    const ns = new ItemSprite(vm, clickAction, hoverAction);
    this.itemSprites.push(ns);
    this.stage.addChild(ns);
  }

  removeSprite(vm){
    const ns = find(this.itemSprites, x=>x.viewModel == vm);
    this.stage.removeChild(ns);
    this.itemSprites.splice(this.itemSprites.indexOf(ns), 1);
  }

  updateView(){
    // update zoom, pan
    const { scale, translate } = this.props;

    if(scale) this.stage.scale.set(scale);
    if(translate) this.stage.position.set(translate[0], translate[1]);

    this.itemSprites.forEach((ns)=>{
      ns.updateView(scale, translate)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateView();
  }
}

class ItemSprite extends PIXI.Container {
  constructor(vm, clickAction, hoverAction) {
    super();
    this.viewModel = vm;
    this.clickAction = clickAction;
    this.hoverAction = hoverAction;
    this.setUp();

    autorun(()=> this.updateAttributes());
    this.updateAttributes();

    this.interactive = true;
  }

  setUp(){

    this.dot = circleGraphic({
      fill: 0x000000,
      radius: 5,
      parent: this
    });
  }

  updateAttributes(){
    const { x, y, color } = this.viewModel;
    this.position.set(x,y);

    if(color) {
      this.dot.tint = rgbToPixiColor(color)
    }
  }

  updateView(scale, translate){
    this.scale.set(Math.sqrt(1/scale));
  }

  click(event){
    event.stopPropagation()
    console.log(this.viewModel.id, this.viewModel.__data);
    this.clickAction(this.viewModel.id);
  }

  mouseover(event){
    event.stopPropagation();
    console.log(this.viewModel.id, this.viewModel.__data);
    this.hoverAction(this.viewModel.legId);
    uiState.playing = false;
  }

  mouseout(event){
    event.stopPropagation();
    this.hoverAction();
    uiState.playing = true;
  }
}


export default PixiView;