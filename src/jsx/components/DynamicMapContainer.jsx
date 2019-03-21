import React from 'react';
import { observer } from 'mobx-react';
import {
  autorun, observable, computed, extendObservable, action,
} from 'mobx';
import { now } from 'mobx-utils';
import {
  random, range, memoize, keyBy,
} from 'lodash';
import {
  interpolateMagma,
  scaleLinear,
  forceCenter,
  forceCollide,
  forceSimulation,
  forceX,
  forceY,
  forceManyBody,
} from 'd3';

import DynamicMapThree from './DynamicMapThree';
import DynamicMapPixi from './DynamicMapPixi';
import DynamicMapHtml from './DynamicMapHtml';
import DynamicMapSVG from './DynamicMapSVG';
import dataAPI from '../data/dataAPI';
import StationsAndConnectionsView from './StationsAndConnectionsView';

@observer
class DynamicMapContainer extends React.Component {
  data = [];

  displayItems = [];

  createDisplayItem = o => ({
    data: o,
    id: o.id,
    x: 960,
    y: 0,
    radius: 5,
    trail: [],
    color: '#FFFFFF',
    target: { x: 960, y: 540, radius: 1 },
  });

  layout = {};

  radiusExtent = [3, 12];

  strengthScale = scaleLinear()
    .domain(this.radiusExtent)
    .range([0.03, 0.07])
    .clamp(true);

  tick(now) {
    this.displayItems.forEach(d => {
      d.radius = d.target.radius;
    });

    this.forceCollide.radius(n => n.target.radius + 5);
    this.forceX.strength(n => this.strengthScale(n.target.radius));
    this.forceY.strength(n => this.strengthScale(n.target.radius));
  }

  layoutCounter = 0;

  refreshLayout() {
    console.log('refreshLayout');

    this.layoutCounter++;
    switch (this.layoutCounter) {
      case 1:
        this.displayItems.forEach(d => {
          d.target.x = (Math.floor(Math.random() * 10) / 10) * this.props.width;
          d.target.y = (Math.floor(Math.random() * 5) / 5) * this.props.height;
          d.target.radius = this.radiusExtent[0]
            + (this.radiusExtent[1] - this.radiusExtent[0]) * Math.random() ** 10;
        });
        break;
      case 2:
        this.displayItems.forEach(d => {
          d.target.x = this.props.width / 2;
          d.target.y = this.props.height / 2;
          d.target.radius = 1;
        });
        break;
      case 3:
        this.displayItems.forEach(d => {
          d.target.x = Math.random() * Math.random() * this.props.width;
          d.target.y = Math.random() * Math.random() * this.props.height;
          d.target.radius = this.radiusExtent[0]
            + (this.radiusExtent[1] - this.radiusExtent[0]) * Math.random() ** 10;
        });
        break;
      case 4:
        this.displayItems.forEach(d => {
          d.target.x = 960;
          d.target.y = Math.random() * Math.random() * this.props.height;
          d.target.radius = (5 * d.target.y) / 1080;
        });
        break;
      default:
        this.layoutCounter = 0;
        this.refreshLayout();
    }

    this.forceX.x(d => d.target.x);
    this.forceY.y(d => d.target.y);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) this.updateDisplayItems();
  }

  componentDidMount() {
    this.updateDisplayItems();
    this.initForce();
    autorun(() => this.tick(now('frame')));
    setInterval(() => this.refreshLayout(), 3000);
    this.setState({ running: true });
  }

  updateDisplayItems() {
    this.displayItems = this.props.data.map(this.createDisplayItem);
  }

  initForce() {
    const fc = forceCenter(this.props.width / 2, this.props.height / 2);
    // const fmb = forceManyBody()
    //   .strength(-10)
    //   .distanceMin(10);
    this.forceX = forceX()
      .x(d => d.target.x)
      .strength(0.025);
    this.forceY = forceY()
      .y(d => d.target.y)
      .strength(0.025);
    this.forceCollide = forceCollide()
      .radius(n => n.radius + 5)
      .strength(0.5);
    this.sim = forceSimulation(this.displayItems)
      .alphaDecay(0)
      .velocityDecay(0.5)
      // .force('center', fc)
      .force('collide', this.forceCollide)
      // .force('charge', fmb)
      .force('x', this.forceX)
      .force('y', this.forceY);

    // this.sim.start();
  }

  render() {
    const {
      data, children, width, height,
    } = this.props;
    // console.log(this.displayItems.length);
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ position: 'relative' }}>
          <DynamicMapPixi
            data={this.displayItems}
            width={width}
            height={height}
          />
        </div>
      </div>
    );
  }
}
export default DynamicMapContainer;
