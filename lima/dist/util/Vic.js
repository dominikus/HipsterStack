(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("lima-core", [], factory);
	else if(typeof exports === 'object')
		exports["lima-core"] = factory();
	else
		root["lima-core"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 213);
/******/ })
/************************************************************************/
/******/ ({

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.rotateBy = rotateBy;
exports.lerp = lerp;
exports.phyllotaxis = phyllotaxis;
exports.polarToCartesian = polarToCartesian;
exports.oscillate = oscillate;
exports.scale = scale;
exports.lerpToPos = lerpToPos;
exports.lerpScale = lerpScale;
exports.samePoint = samePoint;
exports.vectorAngle = vectorAngle;
exports.diffVector = diffVector;
exports.angleBetween = angleBetween;
exports.cssTransform = cssTransform;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = exports.Point = function () {
  function Point() {
    var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Point);

    this.x = 0;
    this.y = 0;

    this.x = _x;
    this.y = _y;
  }

  _createClass(Point, [{
    key: "set",
    value: function set(_x, _y) {
      this.x = _x;
      this.y = _y;
    }
  }]);

  return Point;
}();

;

/**
 * Vic.Matrix
 * Creates a new Matrix object with helper functions
 * taken from https://github.com/pixijs/pixi.js/blob/dev/src/core/math/Matrix.js
 */

var Matrix = exports.Matrix = function () {
  function Matrix() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    _classCallCheck(this, Matrix);

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }

  _createClass(Matrix, [{
    key: "set",
    value: function set(a, b, c, d, tx, ty) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.tx = tx;
      this.ty = ty;

      return this;
    }
  }, {
    key: "apply",
    value: function apply(pos, newPos) {
      newPos = newPos || new Point();

      var x = pos.x;
      var y = pos.y;

      newPos.x = this.a * x + this.c * y + this.tx;
      newPos.y = this.b * x + this.d * y + this.ty;

      return newPos;
    }
  }, {
    key: "applyInverse",
    value: function applyInverse(pos, newPos) {
      newPos = newPos || new Point();

      var id = 1 / (this.a * this.d + this.c * -this.b);

      var x = pos.x;
      var y = pos.y;

      newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
      newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;

      return newPos;
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      this.tx += x;
      this.ty += y;

      return this;
    }
  }, {
    key: "scale",
    value: function scale(x, y) {
      this.a *= x;
      this.d *= y;
      this.c *= x;
      this.b *= y;
      this.tx *= x;
      this.ty *= y;

      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      var cos = Math.cos(angle);
      var sin = Math.sin(angle);

      var a1 = this.a;
      var c1 = this.c;
      var tx1 = this.tx;

      this.a = a1 * cos - this.b * sin;
      this.b = a1 * sin + this.b * cos;
      this.c = c1 * cos - this.d * sin;
      this.d = c1 * sin + this.d * cos;
      this.tx = tx1 * cos - this.ty * sin;
      this.ty = tx1 * sin + this.ty * cos;

      return this;
    }
  }, {
    key: "append",
    value: function append(matrix) {
      var a1 = this.a;
      var b1 = this.b;
      var c1 = this.c;
      var d1 = this.d;

      this.a = matrix.a * a1 + matrix.b * c1;
      this.b = matrix.a * b1 + matrix.b * d1;
      this.c = matrix.c * a1 + matrix.d * c1;
      this.d = matrix.c * b1 + matrix.d * d1;

      this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
      this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;

      return this;
    }
  }]);

  return Matrix;
}();

function rotateBy(point, angleInRadians) {
  var _x = point.x * Math.cos(angleInRadians) - point.y * Math.sin(angleInRadians);
  var _y = point.x * Math.sin(angleInRadians) + point.y * Math.cos(angleInRadians);
  point.set(_x, _y);
};

var sqdist = exports.sqdist = function sqdist(a, b) {
  return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
};
var dist = exports.dist = function dist(a, b) {
  return Math.sqrt(sqdist(a, b));
};

function lerp(from, to, ratio) {
  return to * ratio + from * (1 - ratio);
}

var tau = exports.tau = (Math.sqrt(5) + 1) / 2.0; // golden ratio

function phyllotaxis(i, scale) {
  var angle = 2 * Math.PI * tau * i;
  var radius = Math.sqrt(i) * scale;
  return polarToCartesian(angle, radius);
}

function polarToCartesian(angle, radius) {
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  };
}

// t = 0..1
function oscillate(t, amplitude) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return amplitude * Math.cos((t + offset) * 2 * Math.PI);
}

function scale(p, ratio) {
  p.x *= ratio;
  p.y *= ratio;
  return p;
}

function lerpToPos(from, to, ratio) {
  from.x = lerp(from.x, to.x, ratio);
  from.y = lerp(from.y, to.y, ratio);
}

function lerpScale(scale, val, ratio) {
  scale.set(lerp(scale.x, val, ratio));
}

function samePoint(p1, p2) {
  return sqdist(p1, p2) < 0.00001;
}

function vectorAngle(p) {
  return Math.atan2(p.y, p.x);
}

function diffVector(p1, p2) {
  return { x: p2.x - p1.x, y: p2.y - p1.y };
}

function angleBetween(pixiPoint1, pixiPoint2) {
  var angle1 = Math.atan2(pixiPoint1.y, pixiPoint1.x);
  var angle2 = Math.atan2(pixiPoint2.y, pixiPoint2.x);

  // default results of atan2 are in the range of [-π, π]:
  // turn them into [0, 2π]:
  if (angle1 < 0) angle1 += 2 * Math.PI;
  if (angle2 < 0) angle2 += 2 * Math.PI;

  var result = angle1 - angle2;
  var counter_result = angle2 - angle1;

  if (Math.abs(result) > Math.PI && Math.abs(counter_result) > Math.PI) {
    if (result > 0) {
      result = 2 * Math.PI - result;
      counter_result = counter_result + 2 * Math.PI;
    } else {
      result = result + 2 * Math.PI;
      counter_result = 2 * Math.PI - counter_result;
    }
  }

  // make sure the result is the smaller of the two possible angles:
  if (Math.abs(result) < Math.abs(counter_result)) {
    if (Math.abs(result) > Math.PI) {
      console.log("result: " + result);
      console.log("±: " + counter_result);
    }
    return result;
  } else {
    if (Math.abs(counter_result) > Math.PI) {
      console.log("result: " + counter_result);
      console.log("±: " + result);
    }
    return counter_result;
  }
}

function cssTransform(x, y, scale, rotation) {
  var transform = "";
  transform += "translate(" + x + "px, " + y + "px)";
  if (rotation != null) {
    transform += "rotate(" + rotation + "deg)";
  }
  if (scale != null) {
    transform += "scale(" + scale + ")";
  }

  return transform;
}

/***/ })

/******/ });
});
//# sourceMappingURL=Vic.js.map