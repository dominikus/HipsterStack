/* eslint-disable no-console */

import { observable, computed, action } from 'mobx';
import { map } from 'lodash';
import uiState from '../state/uiState';

class DataAPI {

  @observable ready = false
  // deep observable - all items are observable
  @observable items = []

  init(dataSets) {
    this.items = dataSets.get('first-dataset');
    this.ready = true;
  }

  @action addItems(a) {
    a.forEach(o => this.addItem(o));
  }

  @action addItem(o) {
    this.items.push(o);
  }

  @action removeItemByID(id) {
    this.items.remove(this.items.find(x => x.id === id));
  }

  @computed get numItems() {
    return this.items.length;
  }

  @computed get itemsHash() {
    console.log("*");
    return map(this.items, 'id');
  }

  @computed static get selectedItemId() {
    return uiState.selectedItemId;
  }

  @computed get selectedItem() {
    return this.items ? this.items.find(x => x.id === uiState.selectedItemId) : null;
  }

  @computed get selectedItemLabel() {
    return this.selectedItem ? this.selectedItem.label : '';
  }
}

const dataAPI = new DataAPI();
export default dataAPI;

let index = 0;
const interval = setInterval(() => {
  dataAPI.addItems([1,2,3].map(() => {
    index += 1;
    return {
      index,
      id: (100 + index),
      label: "Label " + index,
    };
  }));
  if (dataAPI.items.length > 100) clearInterval(interval);
}, 5);

// setInterval(() => {
//   dataAPI.removeItemByID(100 + Math.floor(Math.random() * 1000));
// }, 1000);

// setTimeout(()=>{
//   console.log('updating single item')
//   dataAPI.items[0].label = '12345';
// }, 3000);
