import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {observer} from 'mobx-react'

import {tsvParse} from 'd3';
import {defaults} from 'lodash';
import {when} from 'mobx';
import { startRouter } from 'router'

import dataAPI from 'data/dataAPI'

import {dataStore} from 'lima-core'

import ItemMapComponent from 'itemMap/ItemMapComponent'

// data meta-data:
import dataPath from 'data/data.tsv'

@observer
class App extends Component {
	constructor(){
		super()
		startRouter()
		this.loadData()
	}

	loadData(){
		let datasets = [
			{
				'url': dataPath,
				'id': 'items',
				'parser': tsvParse,
				'parseItem': (d)=> defaults({
					'value': +d.value,
					'x': +d.x,
					'y': +d.y
				}, d)
			}
		];

		dataStore.init(datasets, () => {});
		when(() => dataStore.ready, () => {
			dataAPI.init(dataStore.getDataSet('items'));
		});
	}

	render() {
		return (
			<div>
				<h1>Selection: {dataAPI.selectedItemLabel}</h1>
				<h2>num items: {dataAPI.numItems}</h2>
				{dataAPI.dataReady ?
					<ItemMapComponent models={dataAPI.items}/>
					:
					<h2>Loading…</h2>
				}
			</div>
		)
	}
}

export default App