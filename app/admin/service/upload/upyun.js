'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _upyun = require('upyun');

var _upyun2 = _interopRequireDefault(_upyun);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  // 导入方法
  _class.prototype.uploadMethod = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filename, config) {
      var _this2 = this;

      var upyunInstance, savePath;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              upyunInstance = new _upyun2.default(config.upyunBucket, config.operater, config.password, 'v0.api.upyun.com', { apiVersion: 'v2' });
              savePath = this.getSavePath(filename, config.upyunPrefix);
              return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                upyunInstance.putFile(savePath, filename, null, false, {
                  'save-key': '/{year}{mon}{day}/{filename}{.suffix}'
                }, function (err, res) {
                  if (err) {
                    reject(err);
                  } else {
                    if (res.statusCode === 200) {
                      var origin = _this2.getAbsOrigin(config.upyunOrigin);
                      var compeletePath = origin + '/' + savePath;
                      resolve(compeletePath);
                    } else {
                      reject(res);
                    }
                  }
                });
              }));

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function uploadMethod(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return uploadMethod;
  }();

  // 执行方法


  _class.prototype.run = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(file, config) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.upload(file, config);

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function run(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return run;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=upyun.js.map