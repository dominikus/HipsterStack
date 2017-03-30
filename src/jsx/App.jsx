import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Visible from './util/Visible';

import uiState from './state/uiState';

import { getDataSet, loadAllDataSets } from './data/dataStore';
import dataAPI from './data/dataAPI';

import startRouter from './router';
import ContainerComponent from './components/ContainerComponent';

@observer
class App extends Component {
  constructor() {
    super();
    startRouter();

    loadAllDataSets().then(() => {
      dataAPI.init(getDataSet('first-dataset'));
    });
  }

  render() {
    return (
      <div>
        <h1>{uiState.currentView}</h1>

        <Visible if={dataAPI.ready}>
          <h2>Data loaded — {dataAPI.items.length} items</h2>
          <ContainerComponent models={dataAPI.items} />
        </Visible>

        <Visible if={!dataAPI.ready}>
          <h2>Loading…</h2>
        </Visible>

      </div>
    );
  }
}

export default App;
