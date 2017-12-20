import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// import { scaleLinear } from 'd3';

@observer
export default class App extends React.Component {
	@observable counter = 0;
	constructor(props) {
		super(props);
	}

	render() {
		// const xx = scaleLinear();
		return (
			<div>
				asdasdasdasd Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
				sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
				aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
				dolores et ea rebum.asdasd Stet clita kasd gubergren, no sea takimata
				sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
				consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
				labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
				accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
				sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
				sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
				vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			</div>
		);
	}
}
