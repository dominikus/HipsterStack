import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';

import {uiState} from "state/uiState"
import {observer} from 'mobx-react';

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