/* eslint-disable no-param-reassign, no-console */
import { observable, computed, when } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { tsv } from 'd3-fetch';
import { fromPairs, defaults, identity } from 'lodash';

import dataPath from '../../data/data.tsv';
import dataPath2 from '../../data/data2.tsv';

class DataStore {
  dataSetSpecs = [];
  @observable dataSetLoaders = observable.map();
  @observable startedLoading = false;

  // { id, url, parser, parseItem }
  addDataSetSpec({ id, url, loader, parseItem = identity }) {
    const load = () => {
      this.dataSetLoaders.set(id, fromPromise(loader(url).then(data => (
        {
          id,
          data: data.map(parseItem),
        }
      ))));
    };
    this.dataSetSpecs.push({ id, url, load });
  }

  loadAll() {
    this.dataSetSpecs.forEach(dsp => dsp.load());
    this.startedLoading = true;
  }

  @computed get loadedDataSets() {
    return this.dataSetLoaders.values().filter(x => x.state === 'fulfilled');
  }

  @computed get dataSets() {
    const pairs = this.loadedDataSets.map(({ value: { id, data } }) => [id, data]);
    return observable.map(fromPairs(pairs));
  }

  @computed get ready() {
    return this.startedLoading && this.loadedDataSets.length === this.dataSetSpecs.length;
  }
}

const dataStore = new DataStore();
export default dataStore;


when(() => dataStore.ready, () => {
  console.log('dataSets', dataStore.dataSets);
});

// DATA SETS

dataStore.addDataSetSpec({
  url: dataPath,
  id: 'first-dataset',
  loader: tsv,
  parseItem: d => defaults({
    x: +d.x,
    y: +d.y,
  }, d),
});

dataStore.addDataSetSpec({
  url: dataPath2,
  id: 'second-dataset',
  loader: tsv,
  parseItem: d => defaults({
    x: +d.x,
    y: +d.y,
  }, d),
});
