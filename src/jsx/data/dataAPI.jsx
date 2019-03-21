/* eslint-disable no-console */
import { computed } from 'mobx';
import { dataSet } from './dataStore';

class DataAPI {
  @computed
  get ready() {
    return this.items.length > 0;
  }

  @computed get items() {
    return dataSet.current();
  }
}

const dataAPI = new DataAPI();

export default dataAPI;
