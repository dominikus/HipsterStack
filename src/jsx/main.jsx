import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import App from 'App';

import d3_request from "d3-request";

import "../html/index.html";
import "../sass/main.sass";
import dataPath from "file!../data/data.tsv"

d3_request.csv(dataPath, (d)=> {
	ReactDOM.render(
		<App data={d}/>,
		document.getElementById('app')
	);
});