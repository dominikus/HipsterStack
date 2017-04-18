/* eslint-disable no-console */

import React, { Component } from 'react';
import { observer } from 'mobx-react';

class DivView extends Component {
  static propTypes = {
    viewModels: React.PropTypes.arrayOf(React.PropTypes.object),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    // setSelectedItemId: React.PropTypes.func,
  }

  static defaultProps = {
    viewModels: { enter: [], update: [], exit: [], all: [] },
    width: 600,
    height: 400,
    setSelectedItemId: () => {},
  }

  render() {
    // console.log('DivView.render');
    const { width, height, viewModels } = this.props;
    const els = viewModels.map(vm => (
      <Item viewModel={vm} key={vm.id} />
    ));
    return (
      <div
        style={{
          width,
          height,
          // position: 'relative',
        }}
      >
        {els}
      </div>
    );
  }
}

const Item = observer((props) => {
  const { label, x, y, id } = props.viewModel;
  return (
    <div
      className="item"
      style={{
        key: { id },
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
      }}
    >{label}</div>
  );
},
);


export default DivView;
