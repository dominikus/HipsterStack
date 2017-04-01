import { observable, computed, action } from 'mobx';
import { range, sample } from 'lodash';
import uiState from '../state/uiState';


class DataAPI {

  @observable ready = false

  // deep observable - all items are observable
  @observable items = []

  @action init() {
    this.addItems(range(1000).map(i => ({
      label: sample(['•', '+', '-', 'x']),
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      index: i,
    })));

    this.ready = true;
  }

  @action addItems(a) {
    a.forEach(o => this.addItem(o));
  }

  @action addItem(o) {
    this.items.push(o);
  }

  @computed get numItems() {
    return this.items.length;
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
