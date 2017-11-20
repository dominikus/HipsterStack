import React from 'react';
import { observer } from 'mobx-react';
import { orderBy } from 'lodash';
import { scaleLinear, extent } from 'd3';

import VisComponentElement from './VisComponentElement';

const PURPLE = '#440DA0';
const LIGHT_PURPLE = '#A683E0';
const BG = '#FFFFFF';

@observer
export default class VisComponent extends React.Component {
  render() {
    const { nodes, edges, width, height } = this.props;
    const padding = 0.1;

    const xScale = scaleLinear()
      .domain(extent(nodes, ({ x }) => x))
      .range([padding * width, (1 - padding) * width]);

    const yScale = scaleLinear()
      .domain(extent(nodes, ({ y }) => y))
      .range([(1 - padding) * height, padding * height]);

    const nodeEls = orderBy(
      nodes,
      d => d.attributes.type,
      'desc',
    ).map(({ x, y, id, label, attributes: { type } }) => (
      <g key={id} transform={`translate(${xScale(x)}, ${yScale(y)})`}>
        <circle r="1.5" fill={PURPLE} stroke={BG} />
        {type === 'guest' && (
          <g>
            <text
              textAnchor="middle"
              dy="7.5"
              style={{ stroke: '#FFFFFF', fontSize: 5 }}>
              {label}
            </text>
            <text
              textAnchor="middle"
              dy="7.5"
              style={{ fill: PURPLE, fontSize: 5 }}>
              {label}
            </text>
          </g>
        )}
        {type === 'category' && (
          <g>
            <text
              textAnchor="middle"
              dy={3}
              style={{
                stroke: BG,
                strokeWidth: 3,
                fontSize: 8.5,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '.06em',
              }}>
              {label.toUpperCase()}
            </text>
            <text
              textAnchor="middle"
              dy={3}
              style={{
                fill: PURPLE,
                fontSize: 8.5,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '.06em',
              }}>
              {label.toUpperCase()}
            </text>
          </g>
        )}
        {type === 'episode' && (
          <g>
            <text
              textAnchor="start"
              dx="2.5"
              dy="-2.5"
              style={{ stroke: '#FFFFFF', fontSize: 3.5 }}>
              {label}
            </text>
            <text
              textAnchor="start"
              dx="2.5"
              dy="-2.5"
              style={{ fill: PURPLE, fontSize: 3.5 }}>
              {label}
            </text>
          </g>
        )}
      </g>
    ));

    const edgesTransformed = orderBy(
      edges.map(e => ({
        source: nodes.find(({ id }) => id === e.source),
        target: nodes.find(({ id }) => id === e.target),
      })),
      d => d.target.attributes.type,
      'desc',
    );

    const edgeEls = edgesTransformed.map(({ source, target }) => (
      <g>
        <line
          style={
            target.attributes.type === 'category' ? (
              { stroke: BG, strokeWidth: 3 }
            ) : (
              { stroke: BG, strokeWidth: 1.5 }
            )
          }
          x1={xScale(source.x)}
          x2={xScale(target.x)}
          y1={yScale(source.y)}
          y2={yScale(target.y)}
        />
        <line
          style={
            target.attributes.type === 'category' ? (
              { stroke: PURPLE, strokeWidth: 1.25 }
            ) : (
              { stroke: LIGHT_PURPLE, strokeWidth: 0.66 }
            )
          }
          x1={xScale(source.x)}
          x2={xScale(target.x)}
          y1={yScale(source.y)}
          y2={yScale(target.y)}
        />
      </g>
    ));

    return (
      <svg
        width={width + 100}
        height={height}
        style={{ background: BG, fontFamily: 'Avenir Next' }}>
        <g transform="translate(0, 0)">
          <g>{edgeEls}</g>
          <g>{nodeEls}</g>
        </g>
        <g style={{ opacity: 0.15 }} transform="translate(0, 210)scale(.8)">
          {logo}
        </g>
      </svg>
    );
  }
}

const logo = (
  <g>
    <path
      style={{ fill: '#440DA0' }}
      d="M44.8,29.3h58.3c46.9,0,79.4,32.2,79.4,74.3v0.4c0,42-32.4,74.7-79.4,74.7H44.8V29.3z M77.7,58.9v90h25.4
    c26.9,0,45-18.1,45-44.6V104c0-26.5-18.1-45-45-45H77.7z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M247.9,28.2h30.3l64,150.4h-34.4l-13.7-33.5h-63.2l-13.7,33.5h-33.5L247.9,28.2z M282.5,116.1l-19.8-48.4
    l-19.8,48.4H282.5z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M372.3,59.6h-45.4V29.3h123.8v30.3h-45.4v119.1h-32.9V59.6z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M499.3,28.2h30.3l64,150.4h-34.4l-13.7-33.5h-63.2l-13.7,33.5h-33.5L499.3,28.2z M533.9,116.1L514,67.7
    l-19.8,48.4H533.9z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M34.6,361.8L54,338.5c13.4,11.1,27.5,18.1,44.6,18.1c13.4,0,21.6-5.3,21.6-14.1v-0.4c0-8.3-5.1-12.6-30.1-19
    c-30.1-7.7-49.5-16-49.5-45.7V277c0-27.1,21.8-45,52.3-45c21.8,0,40.3,6.8,55.5,19l-17.1,24.8C118,266.6,105,261,92.4,261
    s-19.2,5.8-19.2,13v0.4c0,9.8,6.4,13,32.2,19.6c30.3,7.9,47.4,18.8,47.4,44.8v0.4c0,29.7-22.6,46.3-54.8,46.3
    C75.3,385.7,52.5,377.8,34.6,361.8z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M213,264.5h-45.5v-30.3h123.8v30.3h-45.5v119.1H213V264.5z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M299.2,309.3v-0.4c0-42.5,33.5-77.2,79.6-77.2s79.2,34.4,79.2,76.8v0.4c0,42.5-33.5,77.2-79.6,77.2
    S299.2,351.7,299.2,309.3z M423.6,309.3v-0.4c0-25.6-18.8-46.9-45.2-46.9s-44.8,20.9-44.8,46.5v0.4c0,25.6,18.8,46.9,45.2,46.9
    S423.6,334.9,423.6,309.3z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M482.9,234.2h68.3c19,0,33.7,5.3,43.5,15.2c8.3,8.3,12.8,20.1,12.8,34.1v0.4c0,24.1-13,39.3-32,46.3l36.5,53.3
    h-38.4l-32-47.8h-25.8v47.8h-32.9V234.2z M549,306.7c16,0,25.2-8.5,25.2-21.1v-0.4c0-14.1-9.8-21.3-25.8-21.3h-32.6v42.9H549z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M634.4,234.2h32.9v149.4h-32.9V234.2z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M700.3,234.2H813v29.2h-80v30.3h70.4v29.2h-70.4v31.4H814v29.2H700.3V234.2z"
    />
    <path
      style={{ fill: '#440DA0' }}
      d="M833,361.8l19.4-23.3c13.4,11.1,27.5,18.1,44.6,18.1c13.4,0,21.6-5.3,21.6-14.1v-0.4c0-8.3-5.1-12.6-30.1-19
    c-30.1-7.7-49.5-16-49.5-45.7V277c0-27.1,21.8-45,52.3-45c21.8,0,40.3,6.8,55.5,19l-17.1,24.8c-13.2-9.2-26.2-14.7-38.8-14.7
    c-12.6,0-19.2,5.8-19.2,13v0.4c0,9.8,6.4,13,32.2,19.6c30.3,7.9,47.4,18.8,47.4,44.8v0.4c0,29.7-22.6,46.3-54.8,46.3
    C873.8,385.7,850.9,377.8,833,361.8z"
    />
  </g>
);
