/* eslint-disable no-param-reassign, no-console */
import { lazyObservable } from 'mobx-utils';
import { json } from 'd3';

import dataPath from 'file-loader!../../data/data.json';

export const dataSet = lazyObservable(sink => {
  return json(dataPath, result => {
    sink(
      result
        ? result.map(d => ({
            id: String(d.id),
          }))
        : [],
    );
  });
}, []);
