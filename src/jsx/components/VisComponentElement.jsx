import React from 'react';
import { observer } from 'mobx-react';

import uiState from '../state/uiState';
import { computed } from 'mobx';

@observer
export default class VisComponentElement extends React.Component {
  onClick = () => {
    uiState.setSelectedItemId(this.props.data.id);
  };

  onOver = () => {
    uiState.setHoveredItemId(this.props.data.id);
  };

  onOut = () => {
    uiState.setHoveredItemId();
  };

  @computed
  get selected() {
    return uiState.selectedItemId === this.props.data.id;
  }

  render() {
    const {
      data: { id },
    } = this.props;

    return (
      <div
        onClick={this.onClick}
        onMouseOver={this.onOver}
        onMouseOut={this.onOut}
      >
        id: {id} {this.selected ? '*' : ''}
      </div>
    );
  }
}
