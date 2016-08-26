import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';

import {uiState} from "state/uiState"
import {observer} from 'mobx-react';

import App from 'App';

import "html/index.html";

ReactDOM.render(<App uiState={uiState}/>, document.getElementById('app'));