import { observable, computed, action } from 'mobx';

class UiState {
  @observable currentView = null;
  // @observable mouse = { x: 0, y: 0 };
  @observable selectedItemId = null;
  @observable
  dimensions = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  };

  constructor() {
    /* document.body.onmousemove = e => {
      this.mouse.x = e.pageX;
      this.mouse.y = e.pageY;
    };  */

    window.onresize = () => {
      this.dimensions.width = document.body.clientWidth;
      this.dimensions.height = document.body.clientHeight;
    };
  }

  @computed
  get urlFragment() {
    return [
      // this.selectedTag,
      this.currentView,
      this.selectedItemId,
    ]
      .map(x => (x != null ? encodeURIComponent(x) : ''))
      .join('/');
  }

  @action
  setFromUrlFragment(_p) {
    const p = _p.split('/').map(decodeURIComponent);
    this.currentView = p.shift();
    try {
      this.setSelectedItemId(p.shift());
    } catch (e) {
      this.selectedItemId = null;
    }
  }

  @action
  setSelectedItemId(id) {
    this.selectedItemId = String(id);
  }
}

const uiState = new UiState();
export default uiState;
