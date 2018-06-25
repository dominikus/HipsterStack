/* eslint-disable no-console */

import React, { Component } from 'react';

import { observer } from 'mobx-react';

import uiState from './state/uiState';

import dataAPI from './data/dataAPI';

import VisComponent from './components/VisComponent';
import MouseTip from './components/MouseTip';
import SidePanel from './components/SidePanel';

@observer
class App extends Component {
  render() {
    console.log('App.render', dataAPI.items);
    const { items } = dataAPI;
    return (
      <div>
        <h1>App</h1>
        {dataAPI.ready ? (
          <div>
            <p>Data loaded</p>
            <p>Currentview: {uiState.currentView}</p>
            <VisComponent data={dataAPI.items} />
            <MouseTip visible>
              {dataAPI.hoveredItem && dataAPI.hoveredItem.id}
            </MouseTip>
            <SidePanel visible>
              {dataAPI.selectedItem && dataAPI.selectedItem.id}
            </SidePanel>
          </div>
        ) : (
          <div>Loading…</div>
        )}
      </div>
    );
  }
}

export default App;
