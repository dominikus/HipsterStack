import React from 'react';
import { observer } from 'mobx-react';

import { computed, action } from 'mobx';
import uiState from '../state/uiState';

@observer
class VisComponentElement extends React.Component {
  @action.bound
  onClick() {
    const {
      data: { id },
    } = this.props;
    uiState.setSelectedItemId(id);
  }

  @action.bound
  onOver() {
    const {
      data: { id },
    } = this.props;
    uiState.setHoveredItemId(id);
  }

  @action.bound
  // eslint-disable-next-line class-methods-use-this
  onOut() {
    uiState.setHoveredItemId();
  }

  @computed
  get selected() {
    const {
      data: { id },
    } = this.props;
    return uiState.selectedItemId === id;
  }

  render() {
    const {
      data: { id },
    } = this.props;
    return (
      <div
        className={this.selected ? 'selected' : ''}
        onClick={this.onClick}
        onMouseOver={this.onOver}
        onMouseOut={this.onOut}
      >
        {id}
      </div>
    );
  }
}
export default VisComponentElement;
