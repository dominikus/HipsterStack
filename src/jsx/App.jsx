import React from 'react';
import ReactPIXI from 'react-pixi';
import PIXI from 'pixi.js';

import El from "El";

let {Stage, Sprite, DisplayObjectContainer, Text} = ReactPIXI;
import imagePath from "../assets/particle.png";

export default class App extends React.Component {
  render() {
  	let data = this.props.data;
  	let els = _.range(0,100).map((d)=>{
  		return <El data={d} />;
  	});

    console.log(imagePath);
    return <div>
        <img src={imagePath} />
    		<Stage width={this.props.width} height={this.props.height}>
    			<Text text="Vector text" x={100} y={10} style={{font:'40px Times'}} anchor={new PIXI.Point(0.5,0)} key="2" />
          {els}
    		</Stage>
    	</div>
  }
}
