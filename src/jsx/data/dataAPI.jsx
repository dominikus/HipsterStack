/* eslint-disable no-console */

import { observable, computed, action } from 'mobx';
import uiState from '../state/uiState';

class DataAPI {

  @observable ready = false

  // deep observable - all items are observable
  @observable.shallow items = []

  init(items) {
    this.addItems(items);
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

  @computed get itemsArray() {
    return this.items.slice();
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

const o = { id: 71, label: '***', x: 2, y: 2 };
setTimeout(() => {
  dataAPI.addItem(o);
}, 2000);


setTimeout(() => {
  console.log('TEST 2');
  dataAPI.addItem({ id: 74, label: 'XXX', x: 3, y: 2 });
  o.label = 'NUHU';
  o.y = -1;
}, 3000);


setTimeout(() => {
  console.log('TEST 3');
  dataAPI.removeItemByID(74);
}, 4000);

// setTimeout(()=>{
//   console.log('updating single item')
//   dataAPI.items[0].label = '12345';
// }, 3000);
