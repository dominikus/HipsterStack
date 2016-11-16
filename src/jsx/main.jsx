import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';

import {loadAllDataSets, getDataSet} from 'data/dataStore';

import {observer} from 'mobx-react';

import "html/index.html";
import "sass/main.sass";

import uiState from "state/uiState"
import App from 'App';

ReactDOM.render(<App uiState={uiState}/>, document.getElementById('app'));
loadAllDataSets().then((dataSets)=>{
	console.table(getDataSet("first-dataset"));
	uiState.dataLoaded = true;
})
