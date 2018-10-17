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
      <g
        style={{
          transform: `translate(${this.props.xScale(
            this.props.data.x,
          )}px, ${this.props.yScale(this.props.data.y)}px)`,
        }}
      >
        <circle
          onClick={this.onClick}
          onMouseOver={this.onOver}
          onMouseOut={this.onOut}
          r="8"
          stroke={this.selected ? '#ef0000' : '#fff'}
          fill={this.selected ? '#ef9f9f' : '#999'}
        />
        <text y="4" className={this.selected ? 'selected' : ''}>
          {id}
        </text>
      </g>
    );
  }
}
