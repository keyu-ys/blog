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
   * install
   * @return {[type]} [description]
   */


  _class.prototype.installAction = function installAction() {
    if (this.isGet()) {
      return;
    }
    this.rules = {
      db_account: 'required',
      db_name: 'required',
      username: 'required|minLength:4',
      password: 'required|minLength:8'
    };
    this.validate(this.rules);
  };

  return _class;
}(think.logic.base);

exports.default = _class;
//# sourceMappingURL=index.js.map