/* eslint-disable no-console */
import { find } from 'lodash';
import { computed } from 'mobx';
import { dataSet } from './dataStore';

import uiState from '../state/uiState';

class DataAPI {
  @computed
  get ready() {
    return this.items.length > 0;
  }

  @computed
  get items() {
    return dataSet.current();
  }

  @computed
  get selectedItem() {
    return find(this.items, ({ id }) => id === uiState.selectedItemId);
  }
}

const dataAPI = new DataAPI();
export default dataAPI;
