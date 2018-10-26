import React from 'react';
import ReactDOM from 'react-dom';

import '../sass/main.sass';
import App from './App';

// useStrict(true);

ReactDOM.render(<App />, document.getElementById('app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
