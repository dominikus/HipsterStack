import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import 'html/index.html'
import 'sass/main.sass'

import App from 'App'

import {lima} from 'lima/core';
import {autorun} from 'mobx';

autorun(() => {
	let isReady = lima.ready;
	console.log(`lima is ready ${isReady}`);
});

ReactDOM.render(<App />, document.getElementById('app'))

setInterval(() => {
	lima.ready = !lima.ready;
}, 2000);
