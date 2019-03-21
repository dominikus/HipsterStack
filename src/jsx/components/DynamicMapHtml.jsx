import React from 'react';
import { observer } from 'mobx-react';
import {
  autorun, observable, computed, toJS,
} from 'mobx';
import { now } from 'mobx-utils';
import { memoize } from 'lodash';
import * as THREE from 'three';

@observer
class DynamicMapHtml extends React.Component {
  render() {
    const { data, width, height } = this.props;
    const els = data.map(vm => <Item data={vm} key={vm.id} />);
    return <div style={{ width, height, position: 'relative' }}>{els}</div>;
  }
}

@observer
class Item extends React.Component {
  render() {
    const {
      data: {
        x, y, color, radius,
      },
    } = this.props;

    return (
      <div
        style={{
          position: 'absolute',

          transform: `translate(${x - radius}px, ${y - radius}px)`,
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          background: color,
          borderRadius: `${radius}px`,
        }}
      />
    );
  }
}

export default DynamicMapHtml;
