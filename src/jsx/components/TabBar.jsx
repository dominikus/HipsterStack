import React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { isString } from 'lodash';

@observer
class TabBar extends React.Component {
  render() {
    const { data, property, onChange } = this.props;

    const els = data.map(d => (isString(d) ? (
      <TabBarEl
        onChange={onChange}
        key={d}
        data={{ id: d, label: d }}
        property={property}
      />
    ) : (
      <TabBarEl onChange={onChange} key={d.id} data={d} property={property} />
    )));
    return (
      <div className="tab-bar">
        <span className="label">{this.props.children}</span>
        {els}
      </div>
    );
  }
}

@observer
class TabBarEl extends React.Component {
  @observer get selected() {
    return this.props.property === this.props.data.id;
  }

  @action.bound onClick() {
    this.props.onChange(this.props.data.id);
  }

  render() {
    const {
      data: { id, label },
    } = this.props;

    return (
      <div
        key={id}
        onClick={this.onClick}
        className={this.selected ? 'selected' : null}
      >
        {label}
      </div>
    );
  }
}

export default TabBar;
