import React from 'react';
import { observer } from 'mobx-react';

import VisComponentElement from './VisComponentElement';

@observer
class VisComponent extends React.Component {
  render() {
    const { data } = this.props;
    const els = data.map(d => <VisComponentElement key={d.id} data={d} />);
    return <div className="content">{els}</div>;
  }
}
export default VisComponent;
