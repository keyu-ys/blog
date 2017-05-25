'use strict';
/**
 * model
 */

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$model$relation) {
  (0, _inherits3.default)(_class, _think$model$relation);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _think$model$relation.call.apply(_think$model$relation, [this].concat(args))), _this), _this.relation = {
      post_cate: {
        type: think.model.HAS_MANY,
        field: 'cate_id'
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.getCateArchive = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var data, result, _iterator, _isArray, _i, _ref2, cate;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.model('post_cate').join({
                table: 'post',
                on: ['post_id', 'id']
              }).join({
                table: 'cate',
                on: ['cate_id', 'id']
              }).where({
                type: 0,
                status: 3,
                is_public: 1
              }).order('update_time DESC').select();

            case 2:
              data = _context.sent;
              result = {};
              _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

            case 5:
              if (!_isArray) {
                _context.next = 11;
                break;
              }

              if (!(_i >= _iterator.length)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('break', 19);

            case 8:
              _ref2 = _iterator[_i++];
              _context.next = 15;
              break;

            case 11:
              _i = _iterator.next();

              if (!_i.done) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('break', 19);

            case 14:
              _ref2 = _i.value;

            case 15:
              cate = _ref2;

              if (result[cate.pathname]) {
                result[cate.pathname].count += 1;
              } else {
                result[cate.pathname] = {
                  name: cate.name,
                  pathname: encodeURIComponent(cate.pathname),
                  update_time: cate.update_time,
                  count: 1
                };
              }

            case 17:
              _context.next = 5;
              break;

            case 19:
              return _context.abrupt('return', (0, _values2.default)(result).sort(function (a, b) {
                return a.count > b.count ? -1 : 1;
              }));

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getCateArchive() {
      return _ref.apply(this, arguments);
    }

    return getCateArchive;
  }();

  return _class;
}(think.model.relation);

exports.default = _class;
//# sourceMappingURL=cate.js.map