/* eslint-disable no-param-reassign, no-console */
import { queue, tsvParse, request } from 'd3';
import { defaults, identity, find } from 'lodash';

import dataPath from '../../data/data.tsv';

// import config from 'config/config';

let allDataLoaded = false;
let isLoading = false;
const q = queue();
const resolveQ = [];

const dataSets = [];

function postProcess() {
  dataSets.forEach(() => {
  });
}

export const loadAllDataSets = () => new Promise((resolve, reject) => {
  // resolve if we loaded all data already
  if (allDataLoaded) {
    resolve(dataSets);
  } else if (!isLoading) {
    console.info('init data store');
    isLoading = true;
    dataSets.forEach((d) => {
      q.defer(request, d.url);
    });

    q.awaitAll((err, results) => {
      isLoading = false;
      if (err) {
        reject(err);
        // reject(`error loading ${failedDataset.url}`);
      } else {
        dataSets.forEach((d, i) => {
          d.result = d.parser(results[i].response).map(d.parseItem || identity);
        });

        try {
          postProcess(reject);
        } catch (e) {
          reject(e);
        }

        allDataLoaded = true;

        console.info('* Done loading *');

        resolve();
        resolveQ.forEach(reslve => reslve.call(this));
      }
    });
  } else {
    resolveQ.push(resolve);
  }
});

export const getDataSet = (id) => {
  const dataSet = find(dataSets, x => x.id === id);
  return dataSet.result;
};

// SHARED

console.log(dataPath);
dataSets.push({
  url: dataPath,
  id: 'first-dataset',
  parser: tsvParse,
  parseItem: d => defaults({
    value: +d.value,
  }, d),
});
