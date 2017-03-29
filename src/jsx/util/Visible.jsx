import React from 'react';

export default class Visible extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    if: React.PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    if: false,
  }

  render() {
    const childCount = React.Children.count(this.props.children);
    if (!this.props.if || !childCount) {
      return null;
    } else if (childCount === 1) {
      return this.props.children;
    }
    return <div>{this.props.children}</div>;
  }
}
