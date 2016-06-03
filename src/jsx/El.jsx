import React from 'react';

let El = React.createClass({
	mixins: [],

	getInitialState: function() {
    return {};
  },

  componentDidMount: function(){
  },

  render: function() {
  	let data = this.props.data;
    return <div>{data}</div>;
  }
});

export default El;