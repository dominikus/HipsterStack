/* eslint-disable no-console */

import React, { Component } from 'react';

import { observer } from 'mobx-react';

import uiState from './state/uiState';

import dataAPI from './data/dataAPI';

import startRouter from './router';
import VisComponent from './components/VisComponent';

@observer
class App extends Component {
  constructor() {
    super();
    startRouter();
  }

  render() {
    console.log('App.render', dataAPI.items);
    const { nodes, edges } = dataAPI;
    return (
      <div>
        {/*<h1>Currentview: {uiState.currentView}</h1>*/}

        {dataAPI.ready && (
          <div>
            {/*<h2>Data loaded — {nodes.length} nodes</h2>*/}
            <VisComponent
              nodes={nodes}
              edges={edges}
              width={800}
              height={800}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
