import React from 'react';
import { observer } from 'mobx-react';

import VisComponentElement from './VisComponentElement';

@observer
export default class VisComponent extends React.Component {
  render() {
    const { data } = this.props;
    const els = data.map(d => <VisComponentElement key={d.id} data={d} />);
    return (
      <div>
        <p>Vis: {data.length} items</p>
        {els}
      </div>
    );
  }
}
