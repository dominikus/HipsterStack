/* eslint-disable no-console */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
// hot reloading:
import { hot } from 'react-hot-loader';

import uiState from './state/uiState';
import dataAPI from './data/dataAPI';

import MapboxView from './components/MapboxView';
import TabBar from './components/TabBar';
import Toggle from './components/Toggle';

import MouseTip from './components/MouseTip';
import SidePanel from './components/SidePanel';

@observer
class App extends Component {
  render() {
    const { layers } = dataAPI;

    return (
      <div>
        <h1>App title</h1>
        <div className="controls">
          <TabBar
            data={uiState.modes}
            property={uiState.mode}
            onChange={id => {
              uiState.mode = id;
            }}
          >
            Mode
          </TabBar>
          <Toggle
            selected={uiState.toggleMode}
            onChange={() => {
              uiState.toggleMode = !uiState.toggleMode;
            }}
          >
            toggle
          </Toggle>
        </div>
        {dataAPI.ready ? (
          <div>
            <MapboxView
              layers={layers}
              zoom={7}
              bearing={0}
              pitch={30}
              center={[8.8, 53.1]}
            />
            {/* <MouseTip visible>
              {dataAPI.hoveredItem && dataAPI.hoveredItem.id}
            </MouseTip>
            <SidePanel visible>
              {dataAPI.selectedItem && dataAPI.selectedItem.id}
            </SidePanel> */}
          </div>
        ) : (
          <div>Loading…</div>
        )}
      </div>
    );
  }
}

export default hot(module)(App);
