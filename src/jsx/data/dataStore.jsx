/* eslint-disable no-param-reassign, no-console */
import { lazyObservable } from 'mobx-utils';
import { json } from 'd3';
// import layers from '../../data/3600.geojson';
import layers from '../../data/10k.geojson';
// import layers from '../../data/10-layers.geojson';

// import dataPath from '../../data/data.tsv';

const dataSet = lazyObservable(sink => json(layers).then(sink));

// test if dynamic updates work
// setInterval(() => dataSet.refresh(), 5000);

export { dataSet }; // eslint-disable-line
