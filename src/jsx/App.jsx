import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';

import uiState from "state/uiState"
import {observer} from 'mobx-react';
import {when} from 'mobx';
import Visible from "util/visible"

import {getDataSet, loadAllDataSets} from 'data/dataStore';
import dataAPI from 'data/dataAPI';

import { startRouter } from 'router';

@observer
class App extends Component {
	constructor(){
		super();
		startRouter();

		loadAllDataSets().then((dataSets)=>{
			dataAPI.init(getDataSet("first-dataset"))
		})
	}

	render() {
		return (
			<div>
				<h1>{uiState.currentView}</h1>

				<Visible if={dataAPI.ready}>
					<h2>Data loaded — {dataAPI.items.length} items</h2>
				</Visible>

				<Visible if={!dataAPI.ready}>
					<h2>Loading…</h2>
				</Visible>

			</div>
		);
	}
};

export default App;