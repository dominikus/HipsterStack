/* eslint-disable no-console */

import React, { Component } from 'react';
import { remove } from 'lodash';

class CanvasView extends Component {
  static propTypes = {
    viewModels: React.PropTypes.arrayOf(React.PropTypes.object),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    setSelectedItemId: React.PropTypes.func,
  }

  static defaultProps = {
    viewModels: { enter: [], update: [], exit: [], all: [] },
    width: 1200,
    height: 800,
    setSelectedItemId: () => {},
  }

  componentDidMount() {
    this.updateSprites(this.props.viewModels);
    this.renderCanvas();
  }

  componentWillUpdate(nextProps) {
    this.updateSprites(nextProps.viewModels);
  }

  updateSprites(viewModels) {
    console.log('view.updateSprites');

    viewModels.filter(vm => vm.lifeCycleState === 'enter').forEach((vm) => {
      this.createSprite(vm, this.props.setSelectedItemId);
    });
    viewModels.filter(vm => vm.lifeCycleState === 'exit').forEach((vm) => {
      this.removeSprite(vm, this.props.setSelectedItemId);
    });
  }


  sprites = [];

  createSprite(vm, clickAction) {
    this.sprites.push({
      vm,
      clickAction,
    });
  }

  removeSprite(vm) {
    console.log('removeSprite', vm);
    remove(this.sprites, x => x.vm === vm);
  }

  renderCanvas() {
    const ctx = this.canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.props.width, this.props.height);

    ctx.font = '24px Times New Roman';
    ctx.fillStyle = 'black';

    this.sprites.forEach((sprite) => {
      const x = sprite.vm.x;
      const y = sprite.vm.y;
      // ctx.fillText("•", x, y);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(() => this.renderCanvas());
  }

  render() {
    console.log('view.render');
    const { width, height } = this.props;
    return (
      <div>
        <canvas
          ref={(canvas) => { this.canvas = canvas; }}
          key="numbers"
          width={width}
          height={height}
        />
      </div>
    );
  }
}

export default CanvasView;
