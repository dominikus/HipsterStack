/* eslint-disable no-bitwise */
import * as PIXI from 'pixi.js';
import { rgb } from 'd3';

export const hashToHexColor = hashColor => hashColor.replace('#', '0x');

export const rgbToPixiColor = ({ r, g, b }) => Math.floor((r << 16) + (g << 8) + b);

export const hexToPixiColor = color => {
  const { r, g, b } = rgb(color);
  return Math.floor((r << 16) + (g << 8) + b);
};

export const circleGraphic = ({
  radius,
  fill,
  strokeWidth,
  strokeColor,
  parent,
  blendMode,
}) => {
  const s = new PIXI.Graphics();
  if (strokeWidth != null) {
    s.lineStyle(strokeWidth, strokeColor);
  }
  if (fill != null) {
    s.beginFill(fill);
    s.drawCircle(0, 0, radius);
    s.endFill();
  } else {
    s.drawCircle(0, 0, radius);
  }
  if (blendMode) s.blendMode = blendMode;
  if (parent) parent.addChild(s);

  return s;
};
