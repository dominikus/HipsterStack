import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';

import {observer} from 'mobx-react';

import uiState from "state/uiState"


@observer
class TimerView extends Component {
	 render() {
		return (
			<div>
				<button onClick={()=>uiState.currentView = Math.floor(Math.random()*100)}>
					Seconds passed: {uiState.timer}
				</button>
				<DevTools />
			</div>
		);
	 }

	 onReset = () => {
	   uiState.resetTimer();
	 }
};

export default TimerView;