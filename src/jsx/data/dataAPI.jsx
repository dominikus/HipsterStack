/* eslint-disable no-console */
import { find } from 'lodash';
import { computed } from 'mobx';

import { dataSet } from './dataStore';

import uiState from '../state/uiState';

class DataAPI {
  @computed
  get ready() {
    return this.nodes.length > 0;
  }

  @computed
  get nodes() {
    return dataSet.current().nodes;
  }

  @computed
  get edges() {
    return dataSet.current().edges;
  }

  @computed
  get selectedItem() {
    return find(this.nodes, ({ id }) => id === uiState.selectedItemId);
  }
}

const dataAPI = new DataAPI();
export default dataAPI;
