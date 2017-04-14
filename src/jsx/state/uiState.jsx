import { observable, computed } from 'mobx';

class UiState {
  @observable currentView = '';
  @observable mouse = { x: 0, y: 0 };
  @observable dimensions = { width: document.body.clientWidth, height: document.body.clientHeight };

  constructor() {
    document.body.onmousemove = e => {
      this.mouse.x = e.pageX;
      this.mouse.y = e.pageY;
    };

    window.onresize = e => {
      this.dimensions.width = document.body.clientWidth;
      this.dimensions.height = document.body.clientHeight;
    };
  }

  @computed get path() {
    return `${this.currentView}`;
  }
}

const uiState = new UiState();
export default uiState;
