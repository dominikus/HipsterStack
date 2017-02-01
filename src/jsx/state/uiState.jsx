import {observable, computed, toJS, action} from 'mobx';
import {assign, clone} from 'lodash';

class UiState {
	@observable currentView = "";
	@observable dataLoaded = false;
	@observable selectedItemId = null;

	constructor() {
	}

	@computed get path() {
		return `${this.selectedItemId}`;
	}

	@computed get jsObject() {
		return toJS(this);
	}

	@action update(o) {
		assign(this, o);
	}
};
const uiState = new UiState();
export default uiState;