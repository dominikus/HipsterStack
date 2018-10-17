import { observable, computed, action, autorun } from 'mobx';

class UiState {
  @observable
  selectedItemId = null;
  @observable
  hoveredItemId = null;

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

    window.onhashchange = () => {
      this.updateFromHash();
    };
    // catch the state from the initial hash:
    this.updateFromHash();

    autorun(() => {
      window.location.hash = this.urlFragment;
    });
  }

  @computed
  get urlFragment() {
    return [this.selectedItemId ? this.selectedItemId : '']
      .map(encodeURIComponent)
      .join('/');
  }

  @action
  updateFromHash() {
    try {
      const p = window.location.hash
        .replace('#', '')
        .split('/')
        .map(decodeURIComponent);

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
    this.hoveredItemId = id ? String(id) : null;
  }
}

const uiState = new UiState();
export default uiState;
