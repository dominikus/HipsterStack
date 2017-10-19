import React from 'react';
import ReactDOM from 'react-dom';

import { useStrict } from 'mobx';

import '../html/index.html';
import '../sass/main.sass';

import App from './App';

useStrict(true);

ReactDOM.render(<App />, document.getElementById('app'));
