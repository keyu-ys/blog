'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ghost = require('./ghost');

var _ghost2 = _interopRequireDefault(_ghost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Ghost) {
  (0, _inherits3.default)(_class, _Ghost);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Ghost.apply(this, arguments));
  }

  /**
   * 导入标签
   */
  _class.prototype.tag = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
      var tags = _ref2.tags;

      var len, _iterator, _isArray, _i, _ref3, _tag, result;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!tags || !Array.isArray(tags))) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', 0);

            case 2:
              len = 0;
              _iterator = tags, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

            case 4:
              if (!_isArray) {
                _context.next = 10;
                break;
              }

              if (!(_i >= _iterator.length)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('break', 21);

            case 7:
              _ref3 = _iterator[_i++];
              _context.next = 14;
              break;

            case 10:
              _i = _iterator.next();

              if (!_i.done) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('break', 21);

            case 13:
              _ref3 = _i.value;

            case 14:
              _tag = _ref3;
              _context.next = 17;
              return this.tagModelInstance.addTag({
                name: _tag.name,
                pathname: _tag.slug
              });

            case 17:
              result = _context.sent;


              if (result.type === 'add') {
                len += 1;
              }

            case 19:
              _context.next = 4;
              break;

            case 21:
              return _context.abrupt('return', len);

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function tag(_x) {
      return _ref.apply(this, arguments);
    }

    return tag;
  }();

  /**
   * 导入分类
   * 为了简单不支持子分类导入，默认所有分类为一级分类
   */


  _class.prototype.category = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref5) {
      var categories = _ref5.categories;

      var len, _iterator2, _isArray2, _i2, _ref6, _category, result;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!categories || !Array.isArray(categories))) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', 0);

            case 2:
              len = 0;
              _iterator2 = categories, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

            case 4:
              if (!_isArray2) {
                _context2.next = 10;
                break;
              }

              if (!(_i2 >= _iterator2.length)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('break', 21);

            case 7:
              _ref6 = _iterator2[_i2++];
              _context2.next = 14;
              break;

            case 10:
              _i2 = _iterator2.next();

              if (!_i2.done) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt('break', 21);

            case 13:
              _ref6 = _i2.value;

            case 14:
              _category = _ref6;
              _context2.next = 17;
              return this.cateModelInstance.addCate({
                name: _category.name,
                pathname: _category.slug,
                pid: 0
              });

            case 17:
              result = _context2.sent;


              if (result.type === 'add') {
                len += 1;
              }

            case 19:
              _context2.next = 4;
              break;

            case 21:
              return _context2.abrupt('return', len);

            case 22:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function category(_x2) {
      return _ref4.apply(this, arguments);
    }

    return category;
  }();

  return _class;
}(_ghost2.default);

exports.default = _class;
//# sourceMappingURL=hexo.js.map