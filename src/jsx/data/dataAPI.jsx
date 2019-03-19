/* eslint-disable no-console */
import { find } from 'lodash';
import { computed } from 'mobx';
import { layers } from './dataStore';

import uiState from '../state/uiState';

class DataAPI {
  @computed
  get ready() {
    return true //this.items.length > 0;
  }

  @computed
  get layers() {
    return layers;
  }

  @computed
  get items() {
    return dataSet.current();
  }

  @computed
  get selectedItem() {
    return find(this.items, ({ id }) => id === uiState.selectedItemId);
  }

  @computed
  get hoveredItem() {
    return find(this.items, ({ id }) => id === uiState.hoveredItemId);
  }
}

const dataAPI = new DataAPI();
export default dataAPI;
