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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  /**
   * before
   */
  _class.prototype.__before = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var http, userInfo;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              http = this.http;

              if (!(http.controller === 'user' && http.action === 'login')) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return');

            case 3:
              _context.next = 5;
              return this.session('userInfo');

            case 5:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 8;
                break;
              }

              _context.t0 = {};

            case 8:
              userInfo = _context.t0;

              if (!think.isEmpty(userInfo)) {
                _context.next = 12;
                break;
              }

              if (!this.isAjax()) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', this.fail('NOT_LOGIN'));

            case 12:
              this.userInfo = userInfo;
              if (!this.isAjax()) {
                this.assign('userInfo', { id: userInfo.id, name: userInfo.name, type: userInfo.type });
              }

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function __before() {
      return _ref.apply(this, arguments);
    }

    return __before;
  }();
  /**
   * call magic method
   * @return {} []
   */


  _class.prototype.__call = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var model, options;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isAjax()) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', this.fail('ACTION_NOT_FOUND'));

            case 2:
              model = this.model('options');
              _context2.next = 5;
              return model.getOptions();

            case 5:
              options = _context2.sent;

              //不显示具体的密钥
              options.two_factor_auth = !!options.two_factor_auth;
              options.analyze_code = escape(options.analyze_code);
              options.comment.name = escape(options.comment.name);
              try {
                options.navigation = JSON.parse(options.navigation);
              } catch (e) {
                options.navigation = [];
              }
              delete options.push_sites; //不显示推送的配置，会有安全问题
              this.assign('options', options);
              return _context2.abrupt('return', this.display('index/index'));

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function __call() {
      return _ref2.apply(this, arguments);
    }

    return __call;
  }();

  return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=base.js.map