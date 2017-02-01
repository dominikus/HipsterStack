import {observable, computed, autorun, action, observe} from 'mobx'
import uiState from 'state/uiState'
import {getDataSet} from 'data/dataStore'

import {keyBy} from 'lodash'

class DataAPI {

	@observable dataReady = false

	// deep observable - all items are observable
	@observable items = []

	init(items){
		this.addItems(items)
		this.dataReady = true
	}

	@action addItems(a){
		a.forEach(o=>this.addItem(o))
	}

	@action addItem(o){
		this.items.push(o)
	}

	@computed get numItems(){
		return this.items.length
	}

	@computed get selectedItemId(){
		return uiState.selectedItemId
	}

	@computed get selectedItem(){
		return this.items ? this.items.find(x=> x.id == uiState.selectedItemId): null
	}

	@computed get selectedItemLabel(){
		return this.selectedItem ? this.selectedItem.label : ''
	}

}

let dataAPI = new DataAPI()
export default dataAPI

// TESTING

autorun(()=>{
	console.log('items', dataAPI.items)
})

setInterval(()=>{
	dataAPI.items[1].label += '.'
}, 300)

let counter = 0
setInterval(()=>{
	dataAPI.addItem({
		id: 'id_' + counter++,
		label: counter,
		x: counter*10,
		y: Math.random()*100
	})
}, 1500)

setInterval(()=>{
	dataAPI.items.splice(0, 1)
}, 2500)


