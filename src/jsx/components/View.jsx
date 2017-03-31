import React, { Component } from 'react';
import { observe } from 'mobx';
import { PropTypes } from 'mobx-react';

import { findIndex } from 'lodash';

class View extends Component {

  static propTypes = {
    viewModels: PropTypes.observableArrayOf(React.PropTypes.object),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    setSelectedItemId: React.PropTypes.func,
  }

  static defaultProps = {
    viewModels: [],
    width: 600,
    height: 400,
    setSelectedItemId: () => {},
  }

  componentDidMount() {
    const { viewModels } = this.props;

    observe(viewModels, (x) => {
      x.added.forEach((vm) => {
        // add item
        this.createSprite(vm, this.props.setSelectedItemId);
      });

      x.removed.forEach((vm) => {
        // remove item
        this.removeSprite(vm);
      });
    }, true);

    this.renderCanvas();
  }

  sprites = [];

  createSprite(vm, clickAction) {
    this.sprites.push({
      vm,
      clickAction,
    });
  }

  removeSprite(vm) {
    const spriteIndex = findIndex(this.sprites, x => x.label === vm.value);
    if (spriteIndex) {
      this.sprites.splice(spriteIndex, 1);
    }
  }

  renderCanvas() {
    const ctx = this.canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.props.width, this.props.height);

    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';

    this.sprites.forEach((sprite) => {
      const x = sprite.vm.x;
      const y = sprite.vm.y;
      ctx.fillText(sprite.vm.label, x, y);
    });

    requestAnimationFrame(() => this.renderCanvas());
  }

  render() {
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

export default View;
