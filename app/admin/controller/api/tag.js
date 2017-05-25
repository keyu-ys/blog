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

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * get
   * @return {[type]} [description]
   */
  _class.prototype.getAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = void 0;

              if (!this.id) {
                _context.next = 8;
                break;
              }

              _context.next = 4;
              return this.modelInstance.where({ id: this.id }).find();

            case 4:
              result = _context.sent;

              result.post_tag = result.post_tag.length;
              _context.next = 12;
              break;

            case 8:
              _context.next = 10;
              return this.modelInstance.select();

            case 10:
              result = _context.sent;

              result = result.map(function (item) {
                item.post_tag = item.post_tag.length;
                return item;
              });

            case 12:
              return _context.abrupt('return', this.success(result));

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getAction() {
      return _ref.apply(this, arguments);
    }

    return getAction;
  }();
  /**
   * add user
   * @return {[type]} [description]
   */


  _class.prototype.postAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var data, ret;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = this.post();
              _context2.next = 3;
              return this.modelInstance.addTag(data);

            case 3:
              ret = _context2.sent;

              if (!(ret.type === 'exist')) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', this.fail('TAG_EXIST'));

            case 6:
              return _context2.abrupt('return', this.success({ id: ret.id }));

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function postAction() {
      return _ref2.apply(this, arguments);
    }

    return postAction;
  }();
  /**
   * update user info
   * @return {[type]} [description]
   */


  _class.prototype.putAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var data, rows;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.id) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', this.fail('PARAMS_ERROR'));

            case 2:
              data = this.post();

              data.id = this.id;
              _context3.next = 6;
              return this.modelInstance.saveTag(data);

            case 6:
              rows = _context3.sent;
              return _context3.abrupt('return', this.success({ affectedRows: rows }));

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function putAction() {
      return _ref3.apply(this, arguments);
    }

    return putAction;
  }();

  _class.prototype.deleteAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this.id) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', this.fail('PARAMS_ERROR'));

            case 2:
              _context4.next = 4;
              return this.modelInstance.deleteTag(this.id);

            case 4:
              return _context4.abrupt('return', this.success());

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteAction() {
      return _ref4.apply(this, arguments);
    }

    return deleteAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=tag.js.map