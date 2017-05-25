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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _toMarkdown2 = require('to-markdown');

var _toMarkdown3 = _interopRequireDefault(_toMarkdown2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$service$base) {
  (0, _inherits3.default)(_class, _think$service$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$service$base.apply(this, arguments));
  }

  _class.prototype.init = function init() {
    var _think$service$base$p;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_think$service$base$p = _think$service$base.prototype.init).call.apply(_think$service$base$p, [this].concat(args));
    this.userModelInstance = this.model('user');
    this.cateModelInstance = this.model('cate');
    this.tagModelInstance = this.model('tag');
    this.postModelInstance = this.model('post');
    this.pageModelInstance = this.model('page').setRelation('user');
  };

  _class.prototype.formatDate = function formatDate(date) {
    return (0, _moment2.default)(date).format('YYYY-MM-DD HH:mm:ss');
  };

  _class.prototype.toMarkdown = function toMarkdown(content) {
    return (0, _toMarkdown3.default)(content);
  };

  /**
   * 导入用户
   */


  _class.prototype.user = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function user() {
      return _ref.apply(this, arguments);
    }

    return user;
  }();

  /**
   * 导入分类
   */


  _class.prototype.category = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function category() {
      return _ref2.apply(this, arguments);
    }

    return category;
  }();

  /**
   * 导入标签
   */


  _class.prototype.tag = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function tag() {
      return _ref3.apply(this, arguments);
    }

    return tag;
  }();

  /**
   * 导入文章
   */


  _class.prototype.post = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function post() {
      return _ref4.apply(this, arguments);
    }

    return post;
  }();

  /**
   * 导入页面
   */


  _class.prototype.page = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function page() {
      return _ref5.apply(this, arguments);
    }

    return page;
  }();

  /**
   * 处理上传文件获取导入数据
   */


  _class.prototype.parseFile = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(file) {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function parseFile(_x) {
      return _ref6.apply(this, arguments);
    }

    return parseFile;
  }();

  _class.prototype.importData = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(data) {
      var user, category, tag, post, page;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.user(data);

            case 2:
              user = _context7.sent;
              _context7.next = 5;
              return this.category(data);

            case 5:
              category = _context7.sent;
              _context7.next = 8;
              return this.tag(data);

            case 8:
              tag = _context7.sent;
              _context7.next = 11;
              return this.post(data);

            case 11:
              post = _context7.sent;
              _context7.next = 14;
              return this.page(data);

            case 14:
              page = _context7.sent;
              return _context7.abrupt('return', { user: user, post: post, page: page, tag: tag, category: category });

            case 16:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function importData(_x2) {
      return _ref7.apply(this, arguments);
    }

    return importData;
  }();

  return _class;
}(think.service.base);

_class.DEFAULT_USER_PWD = 'admin12345678';
exports.default = _class;
//# sourceMappingURL=base.js.map