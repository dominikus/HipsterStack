import {observable, computed, autorun, action} from 'mobx';
import uiState from 'state/uiState';
import {getDataSet} from "data/dataStore"

class DataAPI {

	@observable dataReady = false;
	@observable.shallow items = [];
	// @observable items = [];

	constructor(){
		autorun(()=>{
			if(uiState.dataLoaded){
					this.update(getDataSet("items"))
					this.dataReady = true;
				}
			}
		);
	}

	@action update(items){
		this.items = items;
	}

	@computed get selectedItem(){
		return this.items ? this.items.find(x=> x.id == uiState.selectedItemId): null
	}

	@computed get selectedItemLabel(){
		return this.selectedItem ? this.selectedItem.label : ""
	}
}

let dataAPI = new DataAPI();

autorun(()=>{
	console.log("items", dataAPI.items)
})

export default dataAPI;
