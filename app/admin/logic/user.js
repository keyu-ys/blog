'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$logic$base) {
  (0, _inherits3.default)(_class, _think$logic$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$logic$base.apply(this, arguments));
  }

  /**
   * index action logic
   * @return {} []
   */
  _class.prototype.indexAction = function indexAction() {};
  /**
   * 添加或者修改用户
   * @return {} []
   */


  _class.prototype.saveAction = function saveAction() {
    this.allowMethods = 'post';
    this.rules = {};
  };
  /**
   * login
   * @return {} []
   */


  _class.prototype.loginAction = function loginAction() {
    this.allowMethods = 'get,post';
    if (this.isGet()) {
      return;
    }
    this.rules = {
      username: {
        required: true,
        minLength: 4
      },
      password: {
        required: true,
        length: [32, 32]
      },
      factor: {
        regexp: /^\d{6}$/
      }
    };
  };

  return _class;
}(think.logic.base);

exports.default = _class;
//# sourceMappingURL=user.js.map