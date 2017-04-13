/* eslint-disable no-console */

import React, { Component } from 'react';
import { remove } from 'lodash';
import { observer } from 'mobx-react';

class DivView extends Component {
  static propTypes = {
    viewModels: React.PropTypes.arrayOf(React.PropTypes.object),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    setSelectedItemId: React.PropTypes.func,
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
    ))
    return (
      <div style={{
        width,
        height,
        // position: 'relative',
      }}>
        {els}
      </div>
    );
  }
}

@observer
class Item extends React.Component{
  render() {
    const {label, x, y, id} = this.props.viewModel;
     return (
      <div style={{
        key: {id},
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
      }}>{label}</div>
    )
  }
}

export default DivView;
