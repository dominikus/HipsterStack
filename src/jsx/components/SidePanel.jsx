import React from 'react';
import { observer } from 'mobx-react';

import uiState from '../state/uiState';

const SidePanel = observer(props => {
  if (!props.visible || !props.children) return null;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '9999',
        bottom: 0,
        right: 0,
        width: '20em',
        height: '100%',
        padding: '1em',
        background: 'rgba(250, 250, 250,.9)',
      }}
    >
      {props.children}
      <button
        type="submit"
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClick={() => uiState.setSelectedItemId()}
      >
        x
      </button>
    </div>
  );
});
export default SidePanel;
