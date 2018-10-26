import { extent, scaleLinear } from 'd3';
import { observer } from 'mobx-react';
import React from 'react';
import VisComponentElement from './VisComponentElement';


@observer
class VisComponent extends React.Component {
  constructor() {
    super();
    this.state = VisComponent.getDefaultScales();
  }

  static getDefaultScales() {
    return {
      xScale: d => d,
      yScale: d => d,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.data && props.data.length > 0) {
      const xScale = scaleLinear()
        .domain(extent(props.data, d => d.x))
        .range([10, 290]);
      const yScale = scaleLinear()
        .domain(extent(props.data, d => d.y))
        .range([10, 140]);
      return {
        xScale,
        yScale,
      };
    }

    return VisComponent.getDefaultScales();
  }

  render() {
    const { data } = this.props;
    const { xScale, yScale } = this.props;
    const els = data.map(d => (
      <VisComponentElement
        key={d.id}
        data={d}
        xScale={xScale}
        yScale={yScale}
      />
    ));
    return (
      <div>
        <p>
          Vis:
          {' '}
          {data.length}
          {' '}
          items
        </p>
        <svg id="viz">{els}</svg>
      </div>
    );
  }
}
export default VisComponent;
