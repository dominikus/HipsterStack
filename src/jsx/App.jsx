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
    const { hoveredItemId } = uiState;
    return (
      <div>
        <h1>Äpp</h1>
        {dataAPI.ready ? (
          <div>
            <VisComponent data={items} />
            {
              hoveredItemId && (
              <p>
                {`Hovering over ${hoveredItemId}`}
              </p>
              )}
          </div>
        ) : (
          <div>Loading…</div>
        )}
      </div>
    );
  }
}

export default hot(module)(App);
