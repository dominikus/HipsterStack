import React from 'react';
import El from "El";

// let {Stage, Sprite, DisplayObjectContainer, Text} = ReactPIXI;
// import imagePath from "../assets/particle.png";

export default class App extends React.Component {
  render() {
  	let data = this.props.data;
  	let els = _.range(0,100).map((d)=>{
  		return <El data={d} />;
  	});

    return <div>
       {els}
    	</div>
  }
}
