import {queue, tsvParse, request} from 'd3';
import {defaults, identity, find} from 'lodash';

// import config from 'config/config';

let dataSets = [];

// DATA SETS

import dataPath from "data/data.tsv"
console.log(dataPath)
dataSets.push({
  "url": dataPath,
  "id": "items",
  "parser": tsvParse,
  "parseItem": (d)=> defaults({
    "value": +d.value,
    "x": +d.x,
    "y": +d.y
  }, d)
});

function postProcess(){
  dataSets.forEach((d) => {
    // post loading actions
  });
}

// Loading logic

let allDataLoaded = false;
let isLoading = false;
let q = queue();
let resolveQ = [];


export const loadAllDataSets = ()=>{
  return new Promise((resolve, reject) => {
    // resolve if we loaded all data already
    if(allDataLoaded){
      resolve(dataSets);
      return;
    } else if(!isLoading){

      console.info("init data store");
      isLoading = true;
      dataSets.forEach((d)=>{
        q.defer(request, d.url);
      });

      q.awaitAll((err, results) => {
        isLoading = false;
        if(err){

          reject(`error loading ${failedDataset.url}`);
        } else {
           dataSets.forEach((d, i)=>{
            d.result = d.parser(results[i].response).map(d.parseItem || identity);
          });

          try{
            postProcess(reject);
          } catch(e){
            reject(e);
          }

          allDataLoaded = true;

          console.info("* Done loading *")

          resolve();
          resolveQ.forEach((resolve)=>resolve.call(this));
        }
      });
    } else {
      resolveQ.push(resolve);
    }
  });
}


export const getDataSet = (id)=>{
  let dataSet = find(dataSets, (x)=>x.id == id);
  return dataSet.result;
}
