import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import { now } from 'mobx-utils';
import { Sprite, Stage, Container, Text } from 'react-pixi-fiber';

import React from 'react';
import { circleGraphic, hexToPixiColor } from '../util/pixiTools';

// components/Rectangle.js
import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const RectangleGraphic = CustomPIXIComponent(
  {
    customDisplayObject: props => new PIXI.Graphics(),
    customApplyProps: function(instance, oldProps, newProps) {
      const { fill, x = 0, y = 0, width, height } = newProps;
      instance.clear();
      instance.beginFill(fill);
      instance.drawRect(x, y, width, height);
      instance.endFill();
    },
  },
  'Rectangle',
);

@observer
class DynamicMapPixi extends React.Component {
  render() {
    const { data, width, height, frame } = this.props;

    const els = data.map(d => <El key={d.id} frame={frame} data={d}></El>);

    return (
      <Stage
        options={{
          antialias: true,
          transparent: true,
          resolution: window.devicePixelRatio,
          autoResize: true,
        }}
      >
        {els}
      </Stage>
    );
  }
}

@observer
class El extends React.Component {
  render() {
    const {
      data: { id, x, y, radius, color },
      frame,
    } = this.props;

    return (
      <Container x={x} y={y}>
        <Text text="123"></Text>
        <RectangleGraphic
          fill={'0xFFFFFF'}
          x={0}
          y={0}
          width={radius}
          height={radius}
        ></RectangleGraphic>
        <RectangleGraphic
          fill={'#FFFFFF'}
          x={0}
          y={0}
          width={radius}
          height={radius}
        ></RectangleGraphic>
      </Container>
    );
  }
}

export default DynamicMapPixi;
