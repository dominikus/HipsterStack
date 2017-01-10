import {observable, computed} from 'mobx';
import uiState from './uiState';
import {getDataSet} from "../data/dataStore"

const dataAPI = observable({
	get dataSet(){
		return getDataSet("first-dataset")
	}
})

export default dataAPI;