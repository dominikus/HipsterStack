import {observable, computed} from 'mobx';

class UiState {
	@observable currentView = "";

	constructor() {
	}

	@computed get path() {
		return `${this.currentView}`;
	}
};

const uiState = new UiState();
export default uiState;