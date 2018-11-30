import React from 'react';
import { observer } from 'mobx-react';

import uiState from '../state/uiState';

const MouseTip = observer(props => {
  if (!props.visible || !props.children) return null;
  const { x, y } = uiState.mouse;
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: '9999',
        top: y,
        left: x,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          padding: '5px',
          background: '#EEE',
          color: '#333',
          boxShadow: 'rgba(0,0,0, .2) 0px 0px 10px',
        }}
      >
        {props.children}
      </div>
    </div>
  );
});
export default MouseTip;
