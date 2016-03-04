import React from 'react';

export default class App extends React.Component {
  render() {
    return <div>
    		<p>App rendered</p>
    		<p>{this.props.data.length} items loaded</p>
    	</div>
  }
}
