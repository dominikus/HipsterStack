import {observable, computed} from 'mobx';

class UiState {
	@observable currentView = "";
	@observable mouse = {x:0, y:0}

	constructor() {
		document.onmousemove = (e)=>{
	    this.mouse.x = e.pageX;
	    this.mouse.y = e.pageY;
		}
	}

	@computed get path() {
		return `${this.currentView}`;
	}
};

const uiState = new UiState();
export default uiState;