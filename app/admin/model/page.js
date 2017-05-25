'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Post) {
  (0, _inherits3.default)(_class, _Post);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Post.call.apply(_Post, [this].concat(args))), _this), _this.tableName = 'post', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.addPost = function addPost(data) {
    var create_time = think.datetime();
    data = (0, _assign2.default)({
      type: 1,
      status: 0,
      create_time: create_time,
      update_time: create_time,
      is_public: 1
    }, data);

    return this.where({ pathname: data.pathname }).thenAdd(data);
  };

  _class.prototype.savePost = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
      var info;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.where({ id: data.id, type: 1 }).find();

            case 2:
              info = _context.sent;

              if (!think.isEmpty(info)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', _promise2.default.reject(new Error('PAGE_NOT_EXIST')));

            case 5:

              data.update_time = think.datetime();
              return _context.abrupt('return', this.where({ id: data.id }).update(data));

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function savePost(_x) {
      return _ref.apply(this, arguments);
    }

    return savePost;
  }();

  return _class;
}(_post2.default);

exports.default = _class;
//# sourceMappingURL=page.js.map