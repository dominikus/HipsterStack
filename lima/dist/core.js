(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mobx"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define("lima-core", ["mobx", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["lima-core"] = factory(require("mobx"), require("lodash"));
	else
		root["lima-core"] = factory(root["mobx"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_24__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 211);
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

var _d3Request = __webpack_require__(22);

var _mobx = __webpack_require__(2);

var _config = __webpack_require__(215);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var configInstance = undefined;

/**
 * Config class
 * Loads and handles config-files.
 * @namespace config
 */

var _default = (_class = function () {
	function _default() {
		_classCallCheck(this, _default);

		_initDefineProp(this, 'config', _descriptor, this);

		_initDefineProp(this, 'ready', _descriptor2, this);

		_initDefineProp(this, 'failed', _descriptor3, this);
	}

	/**
  * Use this method to access the config singleton internally.
  * @returns {Config} config singleton
  * @memberof internal.Config
  */


	_createClass(_default, [{
		key: 'init',


		/**
   * Loads a tsv-config file.
   * @param {string} [pathToConfig=defaultConfigFile] path to config file
   * @returns {Promise} to be resolved when config has been loaded
   * @memberof config
   */
		value: function init() {
			var _this = this;

			var pathToConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

			var parseConfigData = function parseConfigData(configData, resolve) {
				configData.forEach(function (d) {
					_this.config.set(d.key, d.value);
				});

				_this.ready = true;

				resolve(_this.config);
			};

			return new Promise(function (resolve, reject) {
				if (pathToConfig) {
					(0, _d3Request.tsv)(pathToConfig, function (err, configData) {
						if (err) {
							_this.failed = true;
							reject();
						}

						parseConfigData(configData, resolve);
					});
				} else {
					parseConfigData(_config2.default, resolve);
				}
			});
		}

		/**
   * Returns an entry in the config or undefined.
   * @param {string} entry which config-entry is required
   * @returns {*} result in config or undefined
   * @namespace config
   * @memberof lima
   */

	}, {
		key: 'get',
		value: function get(entry) {
			if (this && this.ready) {
				return this.config.get(entry);
			} else {
				return undefined;
			}
		}
	}], [{
		key: 'get',
		value: function get() {
			if (typeof configInstance != 'undefined') {
				return configInstance;
			} else {
				configInstance = new this();
				return configInstance;
			}
		}
	}]);

	return _default;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'config', [_mobx.observable], {
	enumerable: true,
	initializer: function initializer() {
		return _mobx.observable.map();
	}
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'ready', [_mobx.observable], {
	enumerable: true,
	initializer: function initializer() {
		return false;
	}
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'failed', [_mobx.observable], {
	enumerable: true,
	initializer: function initializer() {
		return false;
	}
})), _class);

exports.default = _default;

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

var _d3Queue = __webpack_require__(41);

var _d3Request = __webpack_require__(22);

var _lodash = __webpack_require__(24);

var _mobx = __webpack_require__(2);

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var dataStore = undefined;

/**
 * Datasets describe files containing data, how to load and parse them.
 * @name Dataset
 * @typedef {Object} Dataset
 * @property {string} url where to find the file
 * @property {string} id unique id of the datasets
 * @property {function} parser which function to parse the file with
 * @property {function=} parseItem which function to parse each entry in the file with
 * @memberof internal.dataStore
 */
var Dataset = {};

/**
 * Function to call on completing load to process ALL datasets
 * @callback postProcess
 * @param {Array.Dataset} datasets an Array of {@link dataStore.Dataset} objects to be loaded
 * @returns
 * @memberof internal.dataStore
 */
var postProcess = function postProcess(datasets) {};

/**
 * Handles data loading and access.
 * 
 * @name dataStore
 * @namespace dataStore
 * @memberof internal
 */

var _default = (_class = function () {
  function _default() {
    _classCallCheck(this, _default);

    _initDefineProp(this, 'ready', _descriptor, this);

    this.loadedDatasets = [];
    this.allDataIds = [];
    this.isLoading = false;
  }

  /**
   * Use this method to access the state singleton internally.
   * @returns {DataStore} dataStore singleton
   * @memberof internal.dataStore
   */


  _createClass(_default, [{
    key: 'loadAllDataSets',


    /**
     * Loads all datasets defined as {@link Dataset} objects.
     * @param {Array.Dataset} datasets an Array of {@link Dataset} objects to be loaded
     * @param {dataStore~postProcess} postProcess function to call on completing load to process ALL datasets
     * @type {function}
     * @returns {Promise} promise to be resolved with all loaded datasets
     * @memberof internal.dataStore
     */
    value: function loadAllDataSets(datasets) {
      var _this = this;

      var postProcess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var q = (0, _d3Queue.queue)();
      var resolveQ = [];

      return new Promise(function (resolve, reject) {
        // resolve if we loaded all data already
        if (_this.ready) {
          resolve(_this.loadedDatasets);
          return;
        } else if (!_this.isLoading) {

          console.info("init data store");
          _this.isLoading = true;
          datasets.forEach(function (d) {
            _this.allDataIds.push(d.id);
            q.defer(_d3Request.request, d.url);
          });

          q.awaitAll(function (err, results) {
            _this.isLoading = false;
            if (err) {
              reject('error loading ' + failedDataset.url);
            } else {
              datasets.forEach(function (d, i) {
                d.result = d.parser(results[i].response).map(d.parseItem || _lodash.identity);
                _this.loadedDatasets.push(d);
              });

              try {
                postProcess(_this.loadedDatasets);
              } catch (e) {
                reject(e);
              }

              _this.ready = true;

              console.info("* Done loading *");

              resolve();
              resolveQ.forEach(function (resolve) {
                return resolve.call(_this);
              });
            }
          });
        } else {
          resolveQ.push(resolve);
        }
      });
    }

    /**
     * Alias for loadAllDataSets
     * @param {Array.Dataset} datasets 
     * @param {dataStore~postProcess} postProcess 
     */

  }, {
    key: 'init',
    value: function init(datasets, postProcess) {
      return this.loadAllDataSets(datasets, postProcess);
    }

    /**
     * Retrieves a dataset with a given id.
     * @param {string} id id of the dataset as defined in its {@link Dataset} object.
     * @returns {(Array|undefined)} dataset or undefined.
     * @memberof internal.dataStore
     */

  }, {
    key: 'getDataSet',
    value: function getDataSet(id) {
      console.log("getDataSet", id);
      var dataSet = (0, _lodash.find)(this.loadedDatasets, function (x) {
        return x.id == id;
      }).result;
      return dataSet;
    }
  }, {
    key: 'getAllDataIDs',
    value: function getAllDataIDs() {
      return this.allDataIds;
    }
  }], [{
    key: 'get',
    value: function get() {
      if (typeof dataStore != 'undefined') {
        return dataStore;
      } else {
        dataStore = new this();
        return dataStore;
      }
    }
  }]);

  return _default;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'ready', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
})), _class);

exports.default = _default;
;

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

var _mobx = __webpack_require__(2);

var _lodash = __webpack_require__(24);

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var state = undefined;

/**
 * State class
 * Encapsulates the state as a singleton object.
 * We're using the "Class+static get()" pattern instead of
 * "export default const state = new State()"
 * to keep ES6 from immediately constructing a state instance on import. This way, the state is only built once
 * we're accessing it via State.get() and we can use things like a loaded config-file to impact on the state etc.
 * @memberof internal
 * @namespace State
 */

var _default = (_class = function () {
	function _default() {
		_classCallCheck(this, _default);

		_initDefineProp(this, 'ready', _descriptor, this);

		_initDefineProp(this, 'dataReady', _descriptor2, this);

		_initDefineProp(this, 'configReady', _descriptor3, this);
	}

	/**
  * Use this method to access the state singleton internally.
  * @returns {State} state singleton
  * @memberof internal.State
  */


	_createClass(_default, [{
		key: 'init',


		/**
   * Initializes the state with a set of attributes and values.
   * @param {Object} initialState 
   */
		value: function init() {
			var _this = this;

			var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			Object.keys(initialState).forEach(function (key) {
				_this.extend(key, initialState[key]);
			});
			this.ready = true;
		}
	}, {
		key: 'extend',
		value: function extend(id, initialValue) {
			var extension = {};
			extension[id] = (0, _mobx.observable)(initialValue);
			(0, _mobx.extendObservable)(this, extension);
		}
	}, {
		key: 'set',
		value: function set(o) {
			var _this2 = this;

			(0, _mobx.runInAction)(function () {
				(0, _lodash.assign)(_this2, o);
			});
		}
	}, {
		key: 'updateState',


		/**
   * Takes an object, extracts all attributes that also exist in the
   * current state and updates their values.
   * @param {Object} the new state values 
   */
		value: function updateState(o) {
			var _this3 = this;

			(0, _mobx.runInAction)(function () {
				Object.keys(o).forEach(function (key) {
					if (_this3.hasOwnProperty(key)) {
						_this3[key] = o[key];
					}
				});
			});
		}
	}, {
		key: 'encoded',
		get: function get() {
			return (0, _mobx.toJS)(this);
		}
	}], [{
		key: 'get',
		value: function get() {
			if (typeof state != 'undefined') {
				return state;
			} else {
				state = new this();
				return state;
			}
		}
	}]);

	return _default;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'ready', [_mobx.observable], {
	enumerable: true,
	initializer: function initializer() {
		return false;
	}
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'dataReady', [_mobx.observable], {
	enumerable: true,
	initializer: function initializer() {
		return false;
	}
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'configReady', [_mobx.observable], {
	enumerable: true,
	initializer: function initializer() {
		return false;
	}
}), _applyDecoratedDescriptor(_class.prototype, 'encoded', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'encoded'), _class.prototype)), _class);

exports.default = _default;
;

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(2);

var _MainLoop = __webpack_require__(52);

var _MainLoop2 = _interopRequireDefault(_MainLoop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var idleManager = undefined;

var IdleManager = (_class = function () {
	function IdleManager() {
		_classCallCheck(this, IdleManager);

		_initDefineProp(this, 'ready', _descriptor, this);

		this.sleepers = new Map();
	}

	_createClass(IdleManager, [{
		key: 'init',
		value: function init() {
			var _this = this;

			// hook up to the main loop
			this.ready = true;

			_MainLoop2.default.get().hook(function (elapsed) {
				_this.check(elapsed);
			});
		}

		/**
   * Adds elapsed time to all sleepers and makes them fall asleep, if necessary.
   * @param {Number} elapsed - number of milliseconds elapsed since last call
   */

	}, {
		key: 'check',
		value: function check(elapsed) {
			for (var sleeper in this.sleepers.values()) {
				if (sleeper.isSleeping) {
					// ignore sleeping sleepers.
				} else {
					sleeper.time += elapsed;
					if (sleeper.time > sleeper.timeout) {
						sleeper.sleepFn.call();
						sleeper.isSleeping = true;
					}
				}
			}
		}

		/**
   * Creates a sleeper, that's able to fall asleep and wake up again.  
   * @param {function} sleepFn - idle function that's called once the timer runs out
   * @param {function} wakeupFn - function that's called once the sleeper wakes up again
   * @param {Number} msTimeout - timeout in milliseconds before idle function fires
   */

	}, {
		key: 'hook',
		value: function hook(sleepFn, wakeupFn, msTimeout) {
			var hash = JSON.stringify(sleepFn) + msTimeout;
			if (this.sleepers.has(hash)) {
				// already added
				return null;
			} else {
				var sleeper = {
					sleepFn: sleepFn,
					wakeupFn: wakeupFn,
					isSleeping: false,
					timeout: msTimeout,
					time: 0
				};
				this.sleepers.set(hash, sleeper);
				return hash;
			}
		}

		/**
   * Removes a sleeper from the sleepers.
   * @param {string} id - sleeper id 
   */

	}, {
		key: 'unhook',
		value: function unhook(id) {
			if (this.sleepers.has(id)) {
				this.sleepers.delete(id);
			}
		}

		/**
   * Reset the IdleManager countdown.
   */

	}, {
		key: 'reset',
		value: function reset() {
			for (var sleeper in this.sleepers.values()) {
				if (sleeper.isSleeping) {
					sleeper.wakeupFn.call();
					sleeper.isSleeping = false;
				}
				sleeper.time = 0;
			}
		}
	}], [{
		key: 'get',
		value: function get() {
			if (typeof idleManager == 'undefined') {
				idleManager = new this();
			}
			return idleManager;
		}
	}]);

	return IdleManager;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'ready', [_mobx.observable], {
	enumerable: true,
	initializer: function initializer() {
		return false;
	}
})), _class);
exports.default = IdleManager;
;

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_nest__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "nest", function() { return __WEBPACK_IMPORTED_MODULE_0__src_nest__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_set__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return __WEBPACK_IMPORTED_MODULE_1__src_set__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_map__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return __WEBPACK_IMPORTED_MODULE_2__src_map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_keys__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return __WEBPACK_IMPORTED_MODULE_3__src_keys__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_values__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return __WEBPACK_IMPORTED_MODULE_4__src_values__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_entries__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "entries", function() { return __WEBPACK_IMPORTED_MODULE_5__src_entries__["a"]; });








/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLima = exports.IdleManagerClass = exports.MainLoopClass = exports.DataStoreClass = exports.ConfigClass = exports.StateClass = exports.idleManager = exports.mainLoop = exports.dataStore = exports.config = exports.uiState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// /time


var _Config = __webpack_require__(100);

var _Config2 = _interopRequireDefault(_Config);

var _DataStore = __webpack_require__(101);

var _DataStore2 = _interopRequireDefault(_DataStore);

var _State = __webpack_require__(102);

var _State2 = _interopRequireDefault(_State);

var _MainLoop = __webpack_require__(52);

var _MainLoop2 = _interopRequireDefault(_MainLoop);

var _IdleManager = __webpack_require__(103);

var _IdleManager2 = _interopRequireDefault(_IdleManager);

var _mobx = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Main
 * @class
 * @alias Lima
 * @namespace lima
 */
var Lima = function () {
  function Lima() {
    _classCallCheck(this, Lima);

    this.ready = (0, _mobx.observable)(false);

    // create singletons:
    this.dataStore = _DataStore2.default.get();
    this.config = _Config2.default.get();
    this.state = _State2.default.get();
    this.mainLoop = _MainLoop2.default.get();
    this.idleManager = _IdleManager2.default.get();
  }

  /**
   * Initializes lima, loading config and data files.
   * @param {string} [pathToConfig=undefined] path to the config file
   * @param {Array.Dataset} [datasets=[]] {@link Dataset} objects to load
   * @param {function} [postProcess=function(){}] function to call on completing load to process ALL datasets
   * @param {Object} [initialState={}] initial state settings
   * @returns {Promise} to be resolved when config and data have been loaded
   * @memberof lima
   */


  _createClass(Lima, [{
    key: 'init',
    value: function init() {
      var pathToConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var datasets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var _this = this;

      var postProcess = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      var initialState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      this.config.init(pathToConfig);
      (0, _mobx.when)(function () {
        return _this.config.ready;
      }, function () {
        _this.state.configReady = true;
        _this.dataStore.init(datasets, postProcess);
      });
      (0, _mobx.when)(function () {
        return _this.dataStore.ready;
      }, function () {
        _this.state.init(initialState);
        _this.state.dataReady = true;
      });
      (0, _mobx.when)(function () {
        return _this.state.ready;
      }, function () {
        _this.ready = true;
      });
    }
  }]);

  return Lima;
}();

var l = new Lima();

var dataStore = l.dataStore;
var config = l.config;
var uiState = l.state;

var mainLoop = l.mainLoop;
var idleManager = l.idleManager;

var initLima = function initLima(pathToConfig, datasets, postProcess, initialState) {
  return l.init(pathToConfig, datasets, postProcess, initialState);
};

window.lima = l;

exports.uiState = uiState;
exports.config = config;
exports.dataStore = dataStore;
exports.mainLoop = mainLoop;
exports.idleManager = idleManager;
exports.StateClass = _State2.default;
exports.ConfigClass = _Config2.default;
exports.DataStoreClass = _DataStore2.default;
exports.MainLoopClass = _MainLoop2.default;
exports.IdleManagerClass = _IdleManager2.default;
exports.initLima = initLima;

/***/ }),

/***/ 215:
/***/ (function(module, exports) {

module.exports = [
	{
		"key": "ready",
		"value": true
	}
];

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

// https://d3js.org/d3-request/ Version 1.0.3. Copyright 2016 Mike Bostock.
(function (global, factory) {
   true ? factory(exports, __webpack_require__(19), __webpack_require__(33), __webpack_require__(35)) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-collection', 'd3-dispatch', 'd3-dsv'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3));
}(this, (function (exports,d3Collection,d3Dispatch,d3Dsv) { 'use strict';

var request = function(url, callback) {
  var request,
      event = d3Dispatch.dispatch("beforesend", "progress", "load", "error"),
      mimeType,
      headers = d3Collection.map(),
      xhr = new XMLHttpRequest,
      user = null,
      password = null,
      response,
      responseType,
      timeout = 0;

  // If IE does not support CORS, use XDomainRequest.
  if (typeof XDomainRequest !== "undefined"
      && !("withCredentials" in xhr)
      && /^(http(s)?:)?\/\//.test(url)) xhr = new XDomainRequest;

  "onload" in xhr
      ? xhr.onload = xhr.onerror = xhr.ontimeout = respond
      : xhr.onreadystatechange = function(o) { xhr.readyState > 3 && respond(o); };

  function respond(o) {
    var status = xhr.status, result;
    if (!status && hasResponse(xhr)
        || status >= 200 && status < 300
        || status === 304) {
      if (response) {
        try {
          result = response.call(request, xhr);
        } catch (e) {
          event.call("error", request, e);
          return;
        }
      } else {
        result = xhr;
      }
      event.call("load", request, result);
    } else {
      event.call("error", request, o);
    }
  }

  xhr.onprogress = function(e) {
    event.call("progress", request, e);
  };

  request = {
    header: function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers.get(name);
      if (value == null) headers.remove(name);
      else headers.set(name, value + "");
      return request;
    },

    // If mimeType is non-null and no Accept header is set, a default is used.
    mimeType: function(value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return request;
    },

    // Specifies what type the response value should take;
    // for instance, arraybuffer, blob, document, or text.
    responseType: function(value) {
      if (!arguments.length) return responseType;
      responseType = value;
      return request;
    },

    timeout: function(value) {
      if (!arguments.length) return timeout;
      timeout = +value;
      return request;
    },

    user: function(value) {
      return arguments.length < 1 ? user : (user = value == null ? null : value + "", request);
    },

    password: function(value) {
      return arguments.length < 1 ? password : (password = value == null ? null : value + "", request);
    },

    // Specify how to convert the response content to a specific type;
    // changes the callback value on "load" events.
    response: function(value) {
      response = value;
      return request;
    },

    // Alias for send("GET", …).
    get: function(data, callback) {
      return request.send("GET", data, callback);
    },

    // Alias for send("POST", …).
    post: function(data, callback) {
      return request.send("POST", data, callback);
    },

    // If callback is non-null, it will be used for error and load events.
    send: function(method, data, callback) {
      xhr.open(method, url, true, user, password);
      if (mimeType != null && !headers.has("accept")) headers.set("accept", mimeType + ",*/*");
      if (xhr.setRequestHeader) headers.each(function(value, name) { xhr.setRequestHeader(name, value); });
      if (mimeType != null && xhr.overrideMimeType) xhr.overrideMimeType(mimeType);
      if (responseType != null) xhr.responseType = responseType;
      if (timeout > 0) xhr.timeout = timeout;
      if (callback == null && typeof data === "function") callback = data, data = null;
      if (callback != null && callback.length === 1) callback = fixCallback(callback);
      if (callback != null) request.on("error", callback).on("load", function(xhr) { callback(null, xhr); });
      event.call("beforesend", request, xhr);
      xhr.send(data == null ? null : data);
      return request;
    },

    abort: function() {
      xhr.abort();
      return request;
    },

    on: function() {
      var value = event.on.apply(event, arguments);
      return value === event ? request : value;
    }
  };

  if (callback != null) {
    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
    return request.get(callback);
  }

  return request;
};

function fixCallback(callback) {
  return function(error, xhr) {
    callback(error == null ? xhr : null);
  };
}

function hasResponse(xhr) {
  var type = xhr.responseType;
  return type && type !== "text"
      ? xhr.response // null on error
      : xhr.responseText; // "" on error
}

var type = function(defaultMimeType, response) {
  return function(url, callback) {
    var r = request(url).mimeType(defaultMimeType).response(response);
    if (callback != null) {
      if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
      return r.get(callback);
    }
    return r;
  };
};

var html = type("text/html", function(xhr) {
  return document.createRange().createContextualFragment(xhr.responseText);
});

var json = type("application/json", function(xhr) {
  return JSON.parse(xhr.responseText);
});

var text = type("text/plain", function(xhr) {
  return xhr.responseText;
});

var xml = type("application/xml", function(xhr) {
  var xml = xhr.responseXML;
  if (!xml) throw new Error("parse error");
  return xml;
});

var dsv = function(defaultMimeType, parse) {
  return function(url, row, callback) {
    if (arguments.length < 3) callback = row, row = null;
    var r = request(url).mimeType(defaultMimeType);
    r.row = function(_) { return arguments.length ? r.response(responseOf(parse, row = _)) : row; };
    r.row(row);
    return callback ? r.get(callback) : r;
  };
};

function responseOf(parse, row) {
  return function(request$$1) {
    return parse(request$$1.responseText, row);
  };
}

var csv = dsv("text/csv", d3Dsv.csvParse);

var tsv = dsv("text/tab-separated-values", d3Dsv.tsvParse);

exports.request = request;
exports.html = html;
exports.json = json;
exports.text = text;
exports.xml = xml;
exports.csv = csv;
exports.tsv = tsv;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};


/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};


/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(7);


/* harmony default export */ __webpack_exports__["a"] = function() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) return rollup != null
        ? rollup(array) : (sortValues != null
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */])(),
        values,
        result = createResult();

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.each(function(values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });

    return result;
  }

  function entries(map, depth) {
    if (++depth > keys.length) return map;
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();
    else array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
  }

  return nest = {
    object: function(array) { return apply(array, 0, createObject, setObject); },
    map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
};

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */])();
}

function setMap(map, key, value) {
  map.set(key, value);
}


/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(7);


function Set() {}

var proto = __WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */].prototype;

Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[__WEBPACK_IMPORTED_MODULE_0__map__["b" /* prefix */] + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set(object, f) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) object.each(function(value) { set.add(value); });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);
    else while (++i < n) set.add(f(object[i], i, object));
  }

  return set;
}

/* harmony default export */ __webpack_exports__["a"] = set;


/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};


/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_dispatch__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return __WEBPACK_IMPORTED_MODULE_0__src_dispatch__["a"]; });



/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ __webpack_exports__["a"] = dispatch;


/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_dsv__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "dsvFormat", function() { return __WEBPACK_IMPORTED_MODULE_0__src_dsv__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_csv__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "csvParse", function() { return __WEBPACK_IMPORTED_MODULE_1__src_csv__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "csvParseRows", function() { return __WEBPACK_IMPORTED_MODULE_1__src_csv__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormat", function() { return __WEBPACK_IMPORTED_MODULE_1__src_csv__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormatRows", function() { return __WEBPACK_IMPORTED_MODULE_1__src_csv__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_tsv__ = __webpack_require__(37);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tsvParse", function() { return __WEBPACK_IMPORTED_MODULE_2__src_tsv__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tsvParseRows", function() { return __WEBPACK_IMPORTED_MODULE_2__src_tsv__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormat", function() { return __WEBPACK_IMPORTED_MODULE_2__src_tsv__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormatRows", function() { return __WEBPACK_IMPORTED_MODULE_2__src_tsv__["d"]; });





/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dsv__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return csvParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return csvParseRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return csvFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return csvFormatRows; });


var csv = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dsv__["a" /* default */])(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatRows = csv.formatRows;


/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dsv__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return tsvParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tsvParseRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return tsvFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return tsvFormatRows; });


var tsv = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dsv__["a" /* default */])("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatRows = tsv.formatRows;


/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_queue__ = __webpack_require__(43);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "queue", function() { return __WEBPACK_IMPORTED_MODULE_0__src_queue__["a"]; });



/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slice; });
var slice = [].slice;


/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array__ = __webpack_require__(42);
/* harmony export (immutable) */ __webpack_exports__["a"] = queue;


var noabort = {};

function Queue(size) {
  if (!(size >= 1)) throw new Error;
  this._size = size;
  this._call =
  this._error = null;
  this._tasks = [];
  this._data = [];
  this._waiting =
  this._active =
  this._ended =
  this._start = 0; // inside a synchronous task callback?
}

Queue.prototype = queue.prototype = {
  constructor: Queue,
  defer: function(callback) {
    if (typeof callback !== "function" || this._call) throw new Error;
    if (this._error != null) return this;
    var t = __WEBPACK_IMPORTED_MODULE_0__array__["a" /* slice */].call(arguments, 1);
    t.push(callback);
    ++this._waiting, this._tasks.push(t);
    poke(this);
    return this;
  },
  abort: function() {
    if (this._error == null) abort(this, new Error("abort"));
    return this;
  },
  await: function(callback) {
    if (typeof callback !== "function" || this._call) throw new Error;
    this._call = function(error, results) { callback.apply(null, [error].concat(results)); };
    maybeNotify(this);
    return this;
  },
  awaitAll: function(callback) {
    if (typeof callback !== "function" || this._call) throw new Error;
    this._call = callback;
    maybeNotify(this);
    return this;
  }
};

function poke(q) {
  if (!q._start) {
    try { start(q); } // let the current task complete
    catch (e) {
      if (q._tasks[q._ended + q._active - 1]) abort(q, e); // task errored synchronously
      else if (!q._data) throw e; // await callback errored synchronously
    }
  }
}

function start(q) {
  while (q._start = q._waiting && q._active < q._size) {
    var i = q._ended + q._active,
        t = q._tasks[i],
        j = t.length - 1,
        c = t[j];
    t[j] = end(q, i);
    --q._waiting, ++q._active;
    t = c.apply(null, t);
    if (!q._tasks[i]) continue; // task finished synchronously
    q._tasks[i] = t || noabort;
  }
}

function end(q, i) {
  return function(e, r) {
    if (!q._tasks[i]) return; // ignore multiple callbacks
    --q._active, ++q._ended;
    q._tasks[i] = null;
    if (q._error != null) return; // ignore secondary errors
    if (e != null) {
      abort(q, e);
    } else {
      q._data[i] = r;
      if (q._waiting) poke(q);
      else maybeNotify(q);
    }
  };
}

function abort(q, e) {
  var i = q._tasks.length, t;
  q._error = e; // ignore active callbacks
  q._data = undefined; // allow gc
  q._waiting = NaN; // prevent starting

  while (--i >= 0) {
    if (t = q._tasks[i]) {
      q._tasks[i] = null;
      if (t.abort) {
        try { t.abort(); }
        catch (e) { /* ignore */ }
      }
    }
  }

  q._active = NaN; // allow notification
  maybeNotify(q);
}

function maybeNotify(q) {
  if (!q._active && q._call) {
    var d = q._data;
    q._data = undefined; // allow gc
    q._call(q._error, d);
  }
}

function queue(concurrency) {
  return new Queue(arguments.length ? +concurrency : Infinity);
}


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(2);

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var mainLoop = undefined;

var MainLoop = (_class = function () {
	function MainLoop() {
		_classCallCheck(this, MainLoop);

		_initDefineProp(this, 'ready', _descriptor, this);

		this.loopFunctions = new Map();
		this.isLooping = false;
		this.startTime = undefined;
		this.time = undefined;
		this.lastTime = undefined;
	}

	_createClass(MainLoop, [{
		key: 'init',
		value: function init() {
			this.ready = true;

			this.start();
		}
	}, {
		key: 'start',
		value: function start() {
			var _this = this;

			// start main loop:
			this.isLooping = true;
			this.startTime = new Date().getTime();
			this.lastTime = this.time = this.startTime;
			requestAnimationFrame(function () {
				return _this.loop();
			});
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.isLooping = false;
		}
	}, {
		key: 'loop',
		value: function loop() {
			var _this2 = this;

			this.time = new Date().getTime();
			var elapsed = this.time - this.lastTime;

			var loopFuncs = this.loopFunctions.values();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.loopFunctions.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var fn = _step.value;

					fn.call(undefined, elapsed);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.lastTime = this.time;
			if (this.isLooping) {
				requestAnimationFrame(function () {
					return _this2.loop();
				});
			}
		}

		/**
   * Adds a new function to call in the main loop.
   * @param {function} fn - the function to call in the main loop. First parameter is current time.
   * @returns {string} an id of the function to unhook it again.
   */

	}, {
		key: 'hook',
		value: function hook(fn) {
			var hash = JSON.stringify(fn);
			if (this.loopFunctions.has(hash)) {
				// already added.
				return null;
			} else {
				this.loopFunctions.set(hash, fn);

				return hash;
			}
		}

		/**
   * Removes a function from the main loop.
   * @param {string} id of the function to remove 
   */

	}, {
		key: 'unhook',
		value: function unhook(id) {
			if (this.loopFunctions.has(id)) {
				this.loopFunctions.delete(id);
			}
		}
	}], [{
		key: 'get',
		value: function get() {
			if (typeof mainLoop == 'undefined') {
				mainLoop = new this();
			}
			return mainLoop;
		}
	}]);

	return MainLoop;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'ready', [_mobx.observable], {
	enumerable: true,
	initializer: function initializer() {
		return false;
	}
})), _class);
exports.default = MainLoop;

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return prefix; });
var prefix = "$";

function Map() {}

Map.prototype = map.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);

  return map;
}

/* harmony default export */ __webpack_exports__["a"] = map;


/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "]";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

/* harmony default export */ __webpack_exports__["a"] = function(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n]"),
      delimiterCode = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns;
    return rows;
  }

  function parseRows(text, f) {
    var EOL = {}, // sentinel value for end-of-line
        EOF = {}, // sentinel value for end-of-file
        rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // the current line number
        t, // the current token
        eol; // is the current token followed by EOL?

    function token() {
      if (I >= N) return EOF; // special case: end of file
      if (eol) return eol = false, EOL; // special case: end of line

      // special case: quotes
      var j = I, c;
      if (text.charCodeAt(j) === 34) {
        var i = j;
        while (i++ < N) {
          if (text.charCodeAt(i) === 34) {
            if (text.charCodeAt(i + 1) !== 34) break;
            ++i;
          }
        }
        I = i + 2;
        c = text.charCodeAt(i + 1);
        if (c === 13) {
          eol = true;
          if (text.charCodeAt(i + 2) === 10) ++I;
        } else if (c === 10) {
          eol = true;
        }
        return text.slice(j + 1, i).replace(/""/g, "\"");
      }

      // common case: find next delimiter or newline
      while (I < N) {
        var k = 1;
        c = text.charCodeAt(I++);
        if (c === 10) eol = true; // \n
        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
        else if (c !== delimiterCode) continue;
        return text.slice(j, I - k);
      }

      // special case: last token before EOF
      return text.slice(j);
    }

    while ((t = token()) !== EOF) {
      var a = [];
      while (t !== EOL && t !== EOF) {
        a.push(t);
        t = token();
      }
      if (f && (a = f(a, n++)) == null) continue;
      rows.push(a);
    }

    return rows;
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    })).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(text) {
    return text == null ? ""
        : reFormat.test(text += "") ? "\"" + text.replace(/\"/g, "\"\"") + "\""
        : text;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatRows: formatRows
  };
};


/***/ })

/******/ });
});
//# sourceMappingURL=core.js.map