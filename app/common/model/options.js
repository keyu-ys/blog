'use strict';
/**
 * model
 */

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$model$base) {
  (0, _inherits3.default)(_class, _think$model$base);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _think$model$base.call.apply(_think$model$base, [this].concat(args))), _this), _this.cacheKey = 'website_options', _this.cacheOptions = {
      timeout: 30 * 24 * 3600 * 1000,
      type: !think.isMaster ? 'file' : 'memory'
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /**
   * options cache key
   * @type {String}
   */

  /**
   * cache options
   * @type {Object}
   */


  /**
   * get options
   * @return {} []
   */
  _class.prototype.getOptions = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(flag) {
      var _this2 = this;

      var ret;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(flag === true)) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return think.cache(this.cacheKey, null);

            case 3:
              _context2.next = 5;
              return think.cache(this.cacheKey, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var data, result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this2.select();

                      case 2:
                        data = _context.sent;
                        result = {};

                        data.forEach(function (item) {
                          result[item.key] = item.value;
                        });
                        return _context.abrupt('return', result);

                      case 6:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this2);
              })), this.cacheOptions);

            case 5:
              ret = _context2.sent;

              //comment type
              if (ret) {
                if (ret.comment && think.isString(ret.comment)) {
                  ret.comment = JSON.parse(ret.comment);
                }
                if (!ret.comment) {
                  ret.comment = { type: 'disqus' };
                }
                // upload settings
                if (ret.upload && think.isString(ret.upload)) {
                  ret.upload = JSON.parse(ret.upload);
                }
                if (!ret.upload) {
                  ret.upload = { type: 'local' };
                }
                if (ret.push_sites && think.isString(ret.push_sites)) {
                  ret.push_sites = JSON.parse(ret.push_sites);
                }
                if (!ret.push_sites) {
                  ret.push_sites = {};
                }
              }
              return _context2.abrupt('return', ret);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getOptions(_x) {
      return _ref.apply(this, arguments);
    }

    return getOptions;
  }();
  /**
   * update options
   * @return {} []
   */


  _class.prototype.updateOptions = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(key, value) {
      var _ref4;

      var data, cacheData, changedData, _key2, p1, promises, _key3, _value, exist, p, postModel;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = think.isObject(key) ? think.extend({}, key) : (_ref4 = {}, _ref4[key] = value, _ref4);
              _context3.next = 3;
              return think.cache(this.cacheKey, undefined, this.cacheOptions);

            case 3:
              cacheData = _context3.sent;

              if (!think.isEmpty(cacheData)) {
                _context3.next = 8;
                break;
              }

              _context3.next = 7;
              return this.getOptions();

            case 7:
              cacheData = _context3.sent;

            case 8:
              changedData = {};

              for (_key2 in data) {
                if (data[_key2] !== cacheData[_key2]) {
                  changedData[_key2] = data[_key2];
                }
              }
              //data is not changed

              if (!think.isEmpty(changedData)) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt('return');

            case 12:
              p1 = think.cache(this.cacheKey, think.extend(cacheData, changedData), this.cacheOptions);
              promises = [p1];
              _context3.t0 = _regenerator2.default.keys(changedData);

            case 15:
              if ((_context3.t1 = _context3.t0()).done) {
                _context3.next = 26;
                break;
              }

              _key3 = _context3.t1.value;
              _value = changedData[_key3];
              _context3.next = 20;
              return this.where({ key: _key3 }).count('key');

            case 20:
              exist = _context3.sent;
              p = void 0;

              if (exist) {
                p = this.where({ key: _key3 }).update({ value: _value });
              } else {
                p = this.add({ key: _key3, value: _value });
              }
              promises.push(p);
              _context3.next = 15;
              break;

            case 26:
              _context3.next = 28;
              return _promise2.default.all(promises);

            case 28:
              _context3.next = 30;
              return this.getOptions(true);

            case 30:
              if (!(typeof changedData.auto_summary !== 'undefined')) {
                _context3.next = 34;
                break;
              }

              postModel = think.model('post', {}, 'admin');
              // doesn't wait for return

              _context3.next = 34;
              return postModel.updateAllPostSummaries();

            case 34:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function updateOptions(_x2, _x3) {
      return _ref3.apply(this, arguments);
    }

    return updateOptions;
  }();

  return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=options.js.map