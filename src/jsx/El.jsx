import React from 'react';
import ReactPIXI from 'react-pixi';
import PIXI from 'pixi.js';
import tweenState from 'react-tween-state';

import imagePath from "../assets/particle.png";

let {Stage, Sprite, DisplayObjectContainer, Text} = ReactPIXI;

let El = React.createClass({
	mixins: [tweenState.Mixin],

	getInitialState: function() {
    return {x: 200, y:200};
  },

  componentDidMount: function(){
  	this.tweenState('x', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 3000,
      endValue: Math.random()*500
    });
  },

  render: function() {
  	let data = this.props.data;
    return <Sprite anchor={new PIXI.Point(0.5,0.5)} image={imagePath} x={this.getTweeningValue('x')} y="200"></Sprite>;
  }
});

export default El;