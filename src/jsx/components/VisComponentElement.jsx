import React from 'react';
import { observer } from 'mobx-react';

import uiState from '../state/uiState';

@observer
export default class VisComponentElement extends React.Component {
  render() {
    const {
      data: { id },
    } = this.props;
    const selected = uiState.selectedItemId === id;
    console.log(uiState.selectedItemId);
    return (
      <div onClick={() => uiState.setSelectedItemId(id)}>
        id: {id} {selected ? '*' : ''}
      </div>
    );
  }
}
