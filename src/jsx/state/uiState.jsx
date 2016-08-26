import {observable, computed} from 'mobx';

class UiState {
	@observable timer = 0;
	@observable language = "en";
	@observable currentView = "";

	constructor() {
		setInterval(() => {
			this.timer += 1;
		}, 1000);
	}

	@computed get path() {
		return `${this.currentView}`;
	}

	resetTimer() {
		this.timer = 0;
	}
};
const uiState = new UiState();
export default uiState;