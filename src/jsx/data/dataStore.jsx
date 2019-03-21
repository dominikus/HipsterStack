/* eslint-disable no-param-reassign, no-console */
import { lazyObservable } from 'mobx-utils';
import { tsv } from 'd3';
import { range } from 'lodash';

import dataPath from '../../data/data.tsv';

const dataSet = lazyObservable(
  sink => tsv(dataPath).then(result => {
    sink(
      result
        ? range(1000).map(d => ({
          id: String(d),
        }))
        : [],
    );
  }),
  [],
);

// test if dynamic updates work
// setInterval(() => dataSet.refresh(), 5000);

export { dataSet }; // eslint-disable-line
