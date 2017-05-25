'use strict';

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
   * set tag pathname with encoding name when user haven't set.
   */
  _class.prototype.checkPathname = function checkPathname() {
    if (this.post('pathname')) {
      return true;
    }

    var name = this.post('name');
    var pathname = encodeURIComponent(name);
    this.post('pathname', pathname);
  };

  _class.prototype.postAction = function postAction() {
    this.rules = {
      name: 'required'
    };

    this.checkPathname();
  };

  _class.prototype.putAction = function putAction() {
    this.rules = {
      name: 'required'
    };

    this.checkPathname();
  };

  return _class;
}(think.logic.base);

exports.default = _class;
//# sourceMappingURL=tag.js.map