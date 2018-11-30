import {
  observable, computed, action, autorun,
} from 'mobx';

class UiState {
  @observable
  mode = null;

  modes = ['mode1', 'mode2'];

  @observable
  toggleMode = false;

  @observable
  selectedItemId = null;

  @observable
  hoveredItemId = null;

  @observable
  dimensions = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  };

  @observable
  mouse = { x: 0, y: 0 };

  constructor() {
    window.onresize = () => {
      this.dimensions.width = document.body.clientWidth;
      this.dimensions.height = document.body.clientHeight;
    };

    window.onhashchange = () => {
      this.updateFromHash();
    };

    document.onmousemove = e => {
      this.setMousePos(e.pageX, e.pageY);
    };
    // catch the state from the initial hash:
    this.updateFromHash();

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
      this.mode,
      this.selectedItemId ? this.selectedItemId : '',
      this.toggleMode,
    ]
      .map(encodeURIComponent)
      .join('/');
  }

  @action
  updateFromHash() {
    const p = window.location.hash
      .replace('#', '')
      .split('/')
      .map(decodeURIComponent);
    try {
      this.mode = p.shift() || this.modes[0];
    } catch (e) {
      // eslint-disable-next-line prefer-destructuring
      this.mode = this.modes[0];
    }

    try {
      this.setSelectedItemId(p.shift());
    } catch (e) {
      this.selectedItemId = null;
    }

    try {
      this.toggleMode = p.shift() === 'true';
    } catch (e) {
      this.toggleMode = false;
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
    this.hoveredItemId = id ? String(id) : null;
  }
}

const uiState = new UiState();
export default uiState;
