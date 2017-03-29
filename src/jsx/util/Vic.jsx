export class Point {
	x = 0;
	y = 0;

	constructor(_x = 0, _y = 0){
		this.x = _x;
		this.y = _y;
	}

	set(_x, _y){
		this.x = _x;
		this.y = _y;
	}
};

/**
 * Vic.Matrix
 * Creates a new Matrix object with helper functions
 * taken from https://github.com/pixijs/pixi.js/blob/dev/src/core/math/Matrix.js
 */
export class Matrix {
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0){
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }

  set(a, b, c, d, tx, ty){
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;

    return this;
  }

  apply(pos, newPos){
    newPos = newPos || new Point();

    const x = pos.x;
    const y = pos.y;

    newPos.x = (this.a * x) + (this.c * y) + this.tx;
    newPos.y = (this.b * x) + (this.d * y) + this.ty;

    return newPos;
  }

  applyInverse(pos, newPos){
    newPos = newPos || new Point();

    const id = 1 / ((this.a * this.d) + (this.c * -this.b));

    const x = pos.x;
    const y = pos.y;

    newPos.x = (this.d * id * x) + (-this.c * id * y) + (((this.ty * this.c) - (this.tx * this.d)) * id);
    newPos.y = (this.a * id * y) + (-this.b * id * x) + (((-this.ty * this.a) + (this.tx * this.b)) * id);

    return newPos;
  }

  translate(x, y){
    this.tx += x;
    this.ty += y;

    return this;
  }

  scale(x, y){
    this.a *= x;
    this.d *= y;
    this.c *= x;
    this.b *= y;
    this.tx *= x;
    this.ty *= y;

    return this;
  }

  rotate(angle){
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const a1 = this.a;
    const c1 = this.c;
    const tx1 = this.tx;

    this.a = (a1 * cos) - (this.b * sin);
    this.b = (a1 * sin) + (this.b * cos);
    this.c = (c1 * cos) - (this.d * sin);
    this.d = (c1 * sin) + (this.d * cos);
    this.tx = (tx1 * cos) - (this.ty * sin);
    this.ty = (tx1 * sin) + (this.ty * cos);

    return this;
  }

  append(matrix){
    const a1 = this.a;
    const b1 = this.b;
    const c1 = this.c;
    const d1 = this.d;

    this.a = (matrix.a * a1) + (matrix.b * c1);
    this.b = (matrix.a * b1) + (matrix.b * d1);
    this.c = (matrix.c * a1) + (matrix.d * c1);
    this.d = (matrix.c * b1) + (matrix.d * d1);

    this.tx = (matrix.tx * a1) + (matrix.ty * c1) + this.tx;
    this.ty = (matrix.tx * b1) + (matrix.ty * d1) + this.ty;

    return this;
  }
}

export function rotateBy(point, angleInRadians) {
  let _x = point.x * Math.cos(angleInRadians) - point.y * Math.sin(angleInRadians);
  let _y = point.x * Math.sin(angleInRadians) + point.y * Math.cos(angleInRadians);
  point.set(_x, _y);
};

export const sqdist = (a, b) => Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
export const dist = (a, b) => Math.sqrt(sqdist(a,b));

export function lerp(from, to, ratio) {
  return to * ratio + from * (1-ratio);
}

export const tau = (Math.sqrt(5) + 1)/2.0; // golden ratio

export function phyllotaxis(i, scale) {
  let angle = 2 * Math.PI * tau * i;
  let radius = Math.sqrt(i) * scale;
  return polarToCartesian(angle, radius);
}

export function polarToCartesian(angle, radius){
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  }
}

// t = 0..1
export function oscillate(t, amplitude, offset=0) {
  return amplitude * Math.cos((t + offset)  * 2 * Math.PI);
}

export function scale(p, ratio) {
  p.x *= ratio;
  p.y *= ratio;
  return p;
}

export function lerpToPos(from, to, ratio) {
  from.x = lerp(from.x, to.x, ratio);
  from.y = lerp(from.y, to.y, ratio);
}

export function lerpScale(scale, val, ratio) {
  scale.set(lerp(scale.x, val, ratio));
}

export function samePoint(p1, p2) {
  return sqdist(p1, p2) < 0.00001;
}

export function vectorAngle(p) {
  return Math.atan2(p.y, p.x);
}

export function diffVector(p1, p2) {
  return {x:p2.x-p1.x, y:p2.y-p1.y};
}

export function angleBetween(pixiPoint1, pixiPoint2){
  let angle1 = Math.atan2(pixiPoint1.y, pixiPoint1.x);
  let angle2 = Math.atan2(pixiPoint2.y, pixiPoint2.x);

  // default results of atan2 are in the range of [-π, π]:
  // turn them into [0, 2π]:
  if(angle1 < 0) angle1 += 2 * Math.PI;
  if(angle2 < 0) angle2 += 2 * Math.PI;

  let result = (angle1 - angle2);
  let counter_result = (angle2 - angle1);

  if(Math.abs(result) > Math.PI && Math.abs(counter_result) > Math.PI){
    if(result > 0){
      result = (2 * Math.PI) - result;
      counter_result = counter_result + (2 * Math.PI);
    } else {
      result = result + (2 * Math.PI);
      counter_result = (2 * Math.PI) - counter_result;
    }
  }

  // make sure the result is the smaller of the two possible angles:
  if(Math.abs(result) < Math.abs(counter_result)){
    if(Math.abs(result) > Math.PI){
      console.log("result: " + result);
      console.log("±: " + counter_result);
    }
    return result;
  } else {
    if(Math.abs(counter_result) > Math.PI){
      console.log("result: " + counter_result);
      console.log("±: " + result);
    }
    return counter_result;
  }
}

export function cssTransform(x, y, scale, rotation) {
  let transform = "";
  transform += `translate(${x}px, ${y}px)`;
  if(rotation != null){
    transform += `rotate(${rotation}deg)`;
  }
  if(scale != null){
    transform += `scale(${scale})`;
  }

  return transform;
}
