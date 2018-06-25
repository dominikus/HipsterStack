import React from 'react';
import { observer } from 'mobx-react';

import uiState from '../state/uiState';

const SidePanel = observer(props => {
  if (!props.visible || !props.children) return null;
  const { x, y } = uiState.mouse;
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '9999',
        bottom: 0,
        left: 0,
        height: '10em',
        width: '100%',
        padding: '1em',
        background: 'rgba(0,0,0,.2)',
      }}
    >
      {props.children}
      <button
        style={{ position: 'absolute', top: '1em', right: '1em' }}
        onClick={() => uiState.setSelectedItemId()}
      >
        x
      </button>
    </div>
  );
});
export default SidePanel;
