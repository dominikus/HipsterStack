/* eslint-disable no-param-reassign, no-console */

import { observable, extendObservable, action, computed } from 'mobx';
import { assign, groupBy } from 'lodash';

export default class ViewModelCollection {
  @observable viewModelMap = observable.shallowMap();

  constructor(models = [], template = {}) {
    this.template = template;
    this.updateModels(models);
  }

  @action updateModels(models) {
    this.viewModelMap.forEach((vm) => {
      vm.lifeCycleState = 'exit';
    });

    models.forEach((m) => {
      if (!this.viewModelMap.has(m.id)) {
        this.viewModelForObject(m).lifeCycleState = 'enter';
      } else {
        this.viewModelForObject(m).lifeCycleState = 'update';
      }
    });

    this.log();
  }
  @computed get viewModels() {
    return this.viewModelMap.values();
  }

  @computed get viewModelsByGroup() {
    return assign({
      enter: [],
      update: [],
      exit: [],
      all: this.viewModelMap.values(),
    }, groupBy(this.viewModelMap.values(), 'lifeCycleState'));
  }

  log() {
    console.log('--');
    this.viewModelMap.forEach(m => (
      console.log([m.id, m.lifeCycleState].join(': '))
    ));
    console.log('--');
  }

  viewModelForObject(o) {
    let m = this.viewModelMap.get(o.id);
    if (!m) {
      // no model yet, create new
      m = this.makeViewModel(o);
      this.viewModelMap.set(o.id, m);
    }
    return m;
  }

  makeViewModel(o) {
    // update function to assign new values
    function update(oo) {
      assign(this, oo);
    }

    return extendObservable({
      update,
      __data: o,
      id: o.id,
      lifeCycleState: 'enter',
    }, this.template);
  }
}

// testing

// const vmc = new ViewModelCollection();

// vmc.updateModels([
//   {id: 1}, {id: 2}
// ]);

// vmc.updateModels([
//   {id: 2}, {id: 3}
// ]);
