/* eslint-disable no-console */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
// hot reloading:
import { hot } from 'react-hot-loader';

import uiState from './state/uiState';
import dataAPI from './data/dataAPI';

import VisComponent from './components/VisComponent';

@observer
class App extends Component {
  render() {
    // console.log('App.render', dataAPI.items);
    const { items } = dataAPI;
    return (
      <div>
        <h1>Äpp</h1>
        {dataAPI.ready ? (
          <div>
            <VisComponent data={dataAPI.items} />
            <p>
              {uiState.hoveredItemId
                ? `Hovering over ${uiState.hoveredItemId}`
                : ''}
            </p>
          </div>
        ) : (
          <div>Loading…</div>
        )}
      </div>
    );
  }
}

export default hot(module)(App);
