'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _post2 = require('../../controller/api/post');

var _post3 = _interopRequireDefault(_post2);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATH = _path2.default.join(think.RUNTIME_PATH, 'importMarkdownFileToFirekylin');

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class(think) {
    (0, _classCallCheck3.default)(this, _class);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, think));

    _this._think = think;
    return _this;
  }
  /**
   * 导入用户
   */


  _class.prototype.user = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', 0);

            case 1:
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
              return _context2.abrupt('return', 0);

            case 1:
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
              return _context3.abrupt('return', 0);

            case 1:
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
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var _this2 = this;

      var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var postsPromise;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (Array.isArray(posts)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt('return', 0);

            case 2:
              postsPromise = posts.map(function () {
                var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(item) {
                  var user, _post;

                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.prev = 0;
                          _context4.next = 3;
                          return _this2._think.session('userInfo');

                        case 3:
                          user = _context4.sent;
                          _post = {
                            title: item.title,
                            pathname: item.pathname,
                            markdown_content: item.markdown_content,
                            create_time: _this2.formatDate(new Date(item.created_at)),
                            update_time: _this2.formatDate(new Date(item.updated_at)),
                            status: 3,
                            user_id: user.id,
                            comment_num: 0,
                            allow_comment: 1,
                            is_public: 1,
                            type: 0
                          };
                          _context4.next = 7;
                          return _post3.default.prototype.getContentAndSummary(_post);

                        case 7:
                          _context4.next = 9;
                          return _this2.postModelInstance.addPost(_post);

                        case 9:
                          _context4.next = 14;
                          break;

                        case 11:
                          _context4.prev = 11;
                          _context4.t0 = _context4['catch'](0);

                          console.log(_context4.t0); // eslint-disable-line no-console

                        case 14:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this2, [[0, 11]]);
                }));

                return function (_x2) {
                  return _ref5.apply(this, arguments);
                };
              }());

              _promise2.default.all(postsPromise);

              return _context5.abrupt('return', posts.length);

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
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
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', 0);

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function page() {
      return _ref6.apply(this, arguments);
    }

    return page;
  }();

  _class.prototype.parseFile = function parseFile(file) {
    try {
      (0, _child_process.execSync)('rm -rf ' + PATH + '; mkdir ' + PATH + '; cd ' + PATH + '; tar zxvf ' + file.path);
      var files = _fs2.default.readdirSync(PATH, { encoding: 'utf-8' });
      if (!files.length) {
        return [];
      }

      return files.map(function (file) {
        var tar = _path2.default.join(PATH, file);
        var title = file.split('.').slice(0, -1).join('');
        var content = _fs2.default.readFileSync(tar, { encoding: 'utf-8' });
        var stat = _fs2.default.statSync(tar);
        return {
          created_at: stat.birthtime.getTime(),
          updated_at: stat.mtime.getTime(),
          title: title,
          pathname: title,
          markdown_content: content
        };
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  /**
   * 执行导入
   */


  _class.prototype.run = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(file) {
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.importData(this.parseFile(file));

            case 2:
              return _context7.abrupt('return', _context7.sent);

            case 3:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function run(_x3) {
      return _ref7.apply(this, arguments);
    }

    return run;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=markdown.js.map