import React from 'react';

export default class Visible extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
  	const childCount = React.Children.count(this.props.children)
  	if (!this.props.if || !childCount){
  		return null
  	} else if(childCount == 1){
  		return this.props.children
  	} else {
  		return <div>{this.props.children}</div>
  	}
  }
}
