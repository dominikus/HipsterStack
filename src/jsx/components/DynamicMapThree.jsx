import React from 'react';
import { observer } from 'mobx-react';
import {
  autorun, observable, computed, toJS,
} from 'mobx';
import { now } from 'mobx-utils';
import { memoize } from 'lodash';
import * as THREE from 'three';

@observer
class DynamicMapThree extends React.Component {
  displayItems = new Map();

  createStage() {
    const W = this.props.width;
    const H = this.props.height;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#F0F0F0');
    this.renderer.setSize(W, H);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 5000);
    this.camera.position.set(0, 0, -1 * Math.max(W, H));
    this.camera.lookAt(0, 0, 0);

    this.pivot = new THREE.Object3D();
    this.pivot.position.set(W / 2, H / 2, 0);
    this.scene.add(this.pivot);

    const light = new THREE.AmbientLight(0xffffff, 0.7); // soft white light
    this.scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.6); // soft white light
    light2.position.set(0, 0, -200);
    light2.castShadow = true;
    light2.target = this.pivot;
    this.scene.add(light2);

    this.scene.add(new THREE.AxesHelper());

    this.mount.appendChild(this.renderer.domElement);
  }

  updateStage() {}

  createDisplayItem(d, clickAction = null, hoverAction = null) {
    const c = new ItemSprite(d, clickAction, hoverAction);
    this.pivot.add(c);
    return c;
  }

  displayItemFor(d) {
    if (!this.displayItems.has(d)) {
      this.displayItems.set(d, this.createDisplayItem(d));
    }
    return this.displayItems.get(d);
  }

  tick(now) {
    this.updateStage();
    this.props.data.forEach(d => {
      this.displayItemFor(d).updateAttributes();
    });

    this.renderer.render(this.scene, this.camera);
  }

  componentDidUpdate(prevProps) {}

  componentDidMount() {
    this.stage = this.createStage();
    autorun(() => this.tick(now('frame')));
  }

  render() {
    const { data, width, height } = this.props;
    return (
      <div
        style={{ width, height }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

class ItemSprite extends THREE.Mesh {
  constructor(vm, clickAction, hoverAction) {
    super();
    this.viewModel = vm;
    this.clickAction = clickAction;
    this.hoverAction = hoverAction;
    this.setUp();

    this.interactive = true;
  }

  setUp() {
    this.geometry = new THREE.SphereGeometry(1);
    this.material = new THREE.MeshPhongMaterial();
  }

  updateAttributes() {
    const {
      x, y, color, radius,
    } = this.viewModel;
    this.position.x = -x;
    this.position.y = -y;
    this.scale.set(radius, radius, radius);

    this.material.color.setStyle(color.toString());
  }

  // updateView(scale, translate){
  //   this.scale.set(Math.sqrt(1/scale));
  // }

  click(event) {
    event.stopPropagation();
    this.clickAction(this.viewModel.id);
  }

  // mouseover(event){
  //   event.stopPropagation();
  //   console.log(this.viewModel.id, this.viewModel.__data);
  //   this.hoverAction(this.viewModel.legId);
  //   // uiState.playing = false;
  // }

  // mouseout(event){
  //   event.stopPropagation();
  //   this.hoverAction();
  //   // uiState.playing = true;
  // }
}
export default DynamicMapThree;
