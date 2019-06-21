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
      xScale, yScale,
      data: { id, x, y },
    } = this.props;
    return (
      <g
        style={{
          transform: `translate(${xScale(
            x,
          )}px, ${yScale(y)}px)`,
        }}
      >
        <circle
          onClick={this.onClick}
          onMouseOver={this.onOver}
          onFocus={this.onOver}
          onMouseOut={this.onOut}
          onBlur={this.onOut}
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
export default VisComponentElement;
