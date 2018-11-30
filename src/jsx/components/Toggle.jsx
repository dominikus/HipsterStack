import React from 'react';
import { observer } from 'mobx-react';

@observer
class Toggle extends React.Component {
  render() {
    const { children, selected, onChange } = this.props;

    return (
      <div
        onClick={onChange}
        className={selected ? 'selected toggle' : 'toggle'}
      >
        {children}
      </div>
    );
  }
}

export default Toggle;
