import { observable, computed, action, autorun } from 'mobx';
import location from 'mobx-location';

class UiState {
  @observable currentView = '';
  @observable mouse = { x: 0, y: 0 };
  @observable selectedItemId = null;
  @observable hoveredItemId = null;

  @observable
  dimensions = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  };

  constructor() {
    window.onresize = () => {
      this.dimensions.width = document.body.clientWidth;
      this.dimensions.height = document.body.clientHeight;
    };

    document.onmousemove = e => {
      this.setMousePos(e.pageX, e.pageY);
    };

    autorun(() => {
      this.updateFromHash();
    });

    autorun(() => {
      window.location.hash = this.urlFragment;
    });
  }

  @action
  setMousePos(x, y) {
    this.mouse.x = x;
    this.mouse.y = y;
  }

  @computed
  get urlFragment() {
    return [
      // this.selectedTag,
      this.currentView,
      this.selectedItemId,
    ]
      .map(encodeURIComponent)
      .join('/');
  }

  @action
  updateFromHash() {
    const p = location.hash
      .replace('#', '')
      .split('/')
      .map(decodeURIComponent);

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

  @action
  clearSelectedItemId() {
    this.setSelectedItemId();
  }

  @action
  setHoveredItemId(id) {
    this.hoveredItemId = String(id);
  }
}

const uiState = new UiState();
export default uiState;
