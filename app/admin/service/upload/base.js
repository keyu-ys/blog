'use strict';

exports.__esModule = true;

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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$service$base) {
  (0, _inherits3.default)(_class, _think$service$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$service$base.apply(this, arguments));
  }

  _class.prototype.init = function init() {
    var _think$service$base$p;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_think$service$base$p = _think$service$base.prototype.init).call.apply(_think$service$base$p, [this].concat(args));
  };

  // 域名不带http/https自动补全http


  _class.prototype.getAbsOrigin = function getAbsOrigin(origin) {
    var reg = /^(https?:)?\/\/.+/;
    if (!reg.test(origin)) {
      return 'http://' + origin;
    }
    return origin;
  };

  // 获取当前的格式化时间


  _class.prototype.formatNow = function formatNow() {
    return (0, _moment2.default)(new Date()).format('YYYYMMDD');
  };

  // 获取存储路径


  _class.prototype.getSavePath = function getSavePath(filename, prefix) {
    prefix = prefix ? prefix + '/' : '';
    var dir = this.formatNow();
    var basename = _path2.default.basename(filename);
    return '' + prefix + dir + '/' + basename;
  };

  // 导入方法


  _class.prototype.uploadMethod = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function uploadMethod() {
      return _ref.apply(this, arguments);
    }

    return uploadMethod;
  }();

  _class.prototype.upload = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(filename, config) {
      var result;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.uploadMethod(filename, config);

            case 2:
              result = _context2.sent;
              return _context2.abrupt('return', result);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function upload(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return upload;
  }();

  return _class;
}(think.service.base);

exports.default = _class;
//# sourceMappingURL=base.js.map