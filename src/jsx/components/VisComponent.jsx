import React from 'react';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { mapValues, keyBy } from 'lodash';
import * as THREE from 'three';

import {
  forceSimulation,
  forceCollide,
  scaleSqrt,
  scaleLinear,
  max,
  min,
  median,
  geoMercator,
  extent,
  interpolateInferno,
} from 'd3';
import { cachedCoords } from '../data/dataStore';

import VisComponentElement from './VisComponentElement';

const W = 900;
const H = 1200;
const runSim = false;

@observer
class VisComponent extends React.Component {
  state = { counter: 0 };

  @observable data = [];

  @computed get radiusScale() {
    const maxSize = max(this.data, ({ size }) => size);
    return scaleSqrt()
      .domain([0, maxSize])
      .range([0, 5]);
  }

  colorScale = scaleLinear()
    .domain([0, 0.015, 0.05, 0.5])
    // .range(['#CCCCCC', '#999944', '#224499', '#000033'])
    .range([0.2, 0.4, 0.7, 1].reverse().map(interpolateInferno))
    .clamp(true);

  @computed get projection() {
    const geoJson = {
      type: 'FeatureCollection',
      features: this.items.map(({ lat, lon }) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lon, lat],
        },
      })),
    };
    return geoMercator().fitSize([W, H], geoJson);
  }

  @computed get startPositions() {
    return mapValues(keyBy(this.data, 'id'), ({ lat, lon }) => this.projection([lon, lat]));
  }

  @computed get displayNodes() {
    return (
      this.data.map(({ id, size, colorVal }) => ({
        x: runSim ? this.startPositions[id][0] : cachedCoords[id].x,
        y: runSim ? this.startPositions[id][1] : cachedCoords[id].y,
        radius: this.radiusScale(size),
        color: this.colorScale(colorVal),
        colorVal,
        size,
        id,
      })) || []
    );
  }

  @observable alpha = 0;

  @computed get displayNodesByID() {
    return keyBy(this.displayNodes, 'id');
  }

  @computed get simulation() {
    const fc = forceCollide().radius(({ radius }) => radius + 1);
    const fs = forceSimulation(this.displayNodes).force('collision', fc);

    rumSim
      && fs.on('tick', () => {
        this.alpha = this.simulation.alpha();
        if (this.alpha < 0.18) {
          this.simulation.stop();
          console.log(
            JSON.stringify(
              keyBy(
                this.displayNodes.map(({ x, y, id }) => ({
                  x,
                  y,
                  id,
                })),
                'id',
              ),
            ),
          );
        }
      });

    return fs;
  }

  componentDidMount() {
    this.data = this.props.data;
    console.log(this.props.data[0]);
    // ADD SCENE
    this.scene = new THREE.Scene();
    // ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 5000);
    // this.camera = new THREE.OrthographicCamera(
    //   -W / 2,
    //   W / 2,
    //   H / 2,
    //   -H / 2,
    //   0.1,
    //   5000,
    // );
    this.camera.position.set(0, 0, -2000);
    this.camera.lookAt(0, 0, 0);

    // ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#F0F0F0');
    this.renderer.setSize(W, H);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.mount.appendChild(this.renderer.domElement);
    // ADD CUBE
    this.pivot = new THREE.Object3D();
    this.scene.add(this.pivot);

    this.cubes = this.data.map(() => {
      const geometry = new THREE.CylinderGeometry(0.5, 0.1, 1);
      const material = new THREE.MeshPhongMaterial({ color: '#433F81' });
      const c = new THREE.Mesh(geometry, material);
      geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -0.5, 0));
      geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));

      this.pivot.add(c);

      return c;
    });

    const light = new THREE.AmbientLight(0xddddff, 0.7); // soft white light
    this.scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffdd, 0.6); // soft white light
    light2.position.set(0, 0, -200);
    light2.castShadow = true;
    light2.target = this.pivot;
    this.scene.add(light2);

    this.scene.add(new THREE.AxesHelper());

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.cubes.forEach((c, i) => {
      const {
        x, y, radius, color, size, colorVal,
      } = this.displayNodes[i];
      c.position.x = -x + W / 2;
      c.position.y = -y + H / 2;
      c.scale.x = radius * 1.75;
      c.scale.y = radius * 1.75;
      c.scale.z = 1 + colorVal * 350;
      this.pivot.rotation.x = (30 * Math.PI) / 180;
      this.pivot.rotation.z = (0 * Math.PI) / 180;
      c.material = new THREE.MeshPhongMaterial({ color: color || '#999999' });
    });
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    const els = this.displayNodes
      && this.displayNodes.map(({
        radius, x, y, id, color,
      }) => (
        <circle
          style={{ opacity: 1, fill: color }}
          cx={x}
          cy={y}
          r={radius}
          key={id}
        />
      ));

    return (
      (!runSim || this.simulation) && (
        <div>
          <div
            style={{ position: 'absolute', right: 0, top: 0 }}
            ref={mount => {
              this.mount = mount;
            }}
          />
          <svg
            style={{
              position: 'absolute',
              top: '10vh',
              left: '5vw',
              width: '40vw',
              height: '80vh',
            }}
            id={this.alpha}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <g>{els}</g>
          </svg>
        </div>
      )
    );
  }
}
export default VisComponent;
