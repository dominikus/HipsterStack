/* eslint-disable no-param-reassign, no-console */
import { lazyObservable } from 'mobx-utils';
import { tsv } from 'd3';

import dataPath from '../../data/data.tsv';

export const dataSet = lazyObservable(
  sink =>
    tsv(dataPath).then(result => {
      sink(
        result
          ? result.map(d =>
              Object.assign(d, {
                id: String(d.id),
                x: Math.random(),
                y: Math.random(),
              }),
            )
          : [],
      );
    }),
  [],
);
