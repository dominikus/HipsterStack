import React from 'react';
import { observer } from 'mobx-react';
import {
  autorun, observable, computed, toJS,
} from 'mobx';
import { now } from 'mobx-utils';
import { memoize } from 'lodash';
import * as THREE from 'three';

@observer
class DynamicMapSVG extends React.Component {
  render() {
    const { data, width, height } = this.props;
    const els = data.map(vm => <Item data={vm} key={vm.id} />);
    return <svg style={{ width, height }}>{els}</svg>;
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
      <circle
        cx={x}
        cy={y}
        r={radius}
        style={{
          fill: color,
        }}
      />
    );
  }
}

export default DynamicMapSVG;
