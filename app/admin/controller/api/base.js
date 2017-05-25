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

/**
 * base rest controller
 */
var _class = function (_think$controller$res) {
  (0, _inherits3.default)(_class, _think$controller$res);

  /**
   * [constructor description]
   * @param  {[type]} http [description]
   * @return {[type]}      [description]
   */
  function _class(http) {
    (0, _classCallCheck3.default)(this, _class);

    var _this = (0, _possibleConstructorReturn3.default)(this, _think$controller$res.call(this, http));

    _this.allowList = ['api/post/put', 'api/post/post', 'api/post/delete', 'api/file/post'];

    _this._method = 'method';
    return _this;
  }
  /**
   * before
   * @return {} []
   */

  /**
   * allow list for user
   * @type {Array}
   */


  _class.prototype.__before = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var userInfo, type, action, name;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.session('userInfo');

            case 2:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 5;
                break;
              }

              _context.t0 = {};

            case 5:
              userInfo = _context.t0;

              if (!think.isEmpty(userInfo)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', this.fail('USER_NOT_LOGIN'));

            case 8:
              this.userInfo = userInfo;
              type = userInfo.type | 0;
              //not admin

              if (!(type !== 1)) {
                _context.next = 18;
                break;
              }

              action = this.http.action;

              if (!(action === 'get')) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return');

            case 14:
              name = this.http.controller + '/' + this.http.action;

              if (!(this.allowList.indexOf(name) > -1)) {
                _context.next = 17;
                break;
              }

              return _context.abrupt('return');

            case 17:
              return _context.abrupt('return', this.fail('USER_NO_PERMISSION'));

            case 18:
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

  return _class;
}(think.controller.rest);

exports.default = _class;
//# sourceMappingURL=base.js.map