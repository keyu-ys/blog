'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var GHOST_POST_STATUS = {
  published: 3, //发布
  draft: 0 //草稿
};

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * 导入用户
   */
  _class.prototype.user = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
      var _this2 = this;

      var users = _ref2.users;
      var usersPromise;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!users || !Array.isArray(users))) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', 0);

            case 2:
              usersPromise = users.map(function (user) {
                return _this2.userModelInstance.addUser({
                  username: user.slug,
                  email: user.email,
                  display_name: user.name,
                  password: _base2.default.DEFAULT_USER_PWD,
                  type: 2, //默认导入用户都为编辑
                  status: 2 }, '127.0.0.1');
              });
              _context.next = 5;
              return _promise2.default.all(usersPromise);

            case 5:
              return _context.abrupt('return', users.length);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function user(_x) {
      return _ref.apply(this, arguments);
    }

    return user;
  }();

  /**
   * 导入文章
   */


  _class.prototype.post = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref4) {
      var _this3 = this;

      var posts = _ref4.posts,
          users = _ref4.users,
          tags = _ref4.tags,
          categories = _ref4.categories,
          post_tags = _ref4.post_tags,
          posts_tags = _ref4.posts_tags,
          post_categories = _ref4.post_categories,
          posts_categories = _ref4.posts_categories;
      var postsPromise;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!Array.isArray(posts) || !Array.isArray(users))) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', 0);

            case 2:

              post_tags = post_tags || posts_tags;
              post_categories = post_categories || posts_categories;
              if (!Array.isArray(post_tags)) {
                post_tags = [];
              }
              if (!Array.isArray(post_categories)) {
                post_categories = [];
              }
              if (!Array.isArray(tags)) {
                tags = [];
              }
              if (!Array.isArray(categories)) {
                categories = [];
              }

              posts = posts.filter(function (item) {
                return item.page === 0;
              });
              postsPromise = posts.map(function () {
                var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(item) {
                  var userSlug, user, tag, retTag, cate, retCategory, _post;

                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.prev = 0;

                          //获取用户
                          userSlug = users.filter(function (user) {
                            return user.id === item.author_id;
                          })[0].slug;
                          _context2.next = 4;
                          return _this3.userModelInstance.where({ name: userSlug }).find();

                        case 4:
                          user = _context2.sent;


                          //获取标签
                          tag = [];
                          retTag = post_tags.filter(function (tag) {
                            return tag.post_id === item.id;
                          }).map(function (tag) {
                            return tag.tag_id;
                          });

                          retTag = tags.filter(function (_ref6) {
                            var id = _ref6.id;
                            return retTag.includes(id);
                          }).map(function (_ref7) {
                            var name = _ref7.name;
                            return name;
                          });

                          if (!retTag.length) {
                            _context2.next = 13;
                            break;
                          }

                          _context2.next = 11;
                          return _this3.tagModelInstance.setRelation(false).where({ name: ['IN', retTag] }).select();

                        case 11:
                          tag = _context2.sent;

                          tag = tag.map(function (item) {
                            return item.id;
                          });

                        case 13:

                          //获取分类
                          cate = [];
                          retCategory = post_categories.filter(function (_ref8) {
                            var post_id = _ref8.post_id;
                            return post_id === item.id;
                          }).map(function (_ref9) {
                            var category_id = _ref9.category_id;
                            return category_id;
                          });

                          retCategory = categories.filter(function (_ref10) {
                            var id = _ref10.id;
                            return retCategory.includes(id);
                          }).map(function (_ref11) {
                            var name = _ref11.name;
                            return name;
                          });

                          if (!retCategory.length) {
                            _context2.next = 21;
                            break;
                          }

                          _context2.next = 19;
                          return _this3.cateModelInstance.setRelation(false).where({ name: ['IN', retCategory] }).select();

                        case 19:
                          cate = _context2.sent;

                          cate = cate.map(function (item) {
                            return item.id;
                          });

                        case 21:
                          _post = {
                            title: item.title,
                            pathname: item.slug,
                            content: item.html,
                            summary: item.html,
                            markdown_content: item.hasOwnProperty('markdown') ? item.markdown : _this3.toMarkdown(item.html),
                            create_time: _this3.formatDate(new Date(item.created_at)),
                            update_time: _this3.formatDate(new Date(item.updated_at)),
                            status: GHOST_POST_STATUS[item.status] || 0,
                            user_id: user.id,
                            comment_num: 0,
                            allow_comment: item.hasOwnProperty('allow_comment') ? item.allow_comment : 1,
                            is_public: item.hasOwnProperty('visibility') ? Number(item.visibility === 'public') : 1,
                            tag: tag,
                            cate: cate
                          };
                          _context2.next = 24;
                          return _this3.postModelInstance.addPost(_post);

                        case 24:
                          _context2.next = 29;
                          break;

                        case 26:
                          _context2.prev = 26;
                          _context2.t0 = _context2['catch'](0);

                          console.log(_context2.t0); // eslint-disable-line no-console

                        case 29:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this3, [[0, 26]]);
                }));

                return function (_x3) {
                  return _ref5.apply(this, arguments);
                };
              }());

              _promise2.default.all(postsPromise);

              return _context3.abrupt('return', posts.length);

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function post(_x2) {
      return _ref3.apply(this, arguments);
    }

    return post;
  }();

  /**
   * 导入页面
   */


  _class.prototype.page = function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref13) {
      var _this4 = this;

      var posts = _ref13.posts,
          users = _ref13.users;
      var pages, pagesPromise;
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
              pages = posts.filter(function (item) {
                return item.page === 1 && item.title;
              });
              pagesPromise = pages.map(function () {
                var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(item) {
                  var userSlug, user, page;
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          userSlug = users.filter(function (user) {
                            return user.id === item.author_id;
                          })[0].slug;
                          _context4.next = 3;
                          return _this4.userModelInstance.where({ name: userSlug }).find();

                        case 3:
                          user = _context4.sent;
                          page = {
                            title: item.title,
                            pathname: item.slug,
                            content: item.html,
                            summary: item.html,
                            markdown_content: item.hasOwnProperty('markdown') ? item.markdown : _this4.toMarkdown(item.html),
                            create_time: _this4.formatDate(new Date(item.created_at)),
                            update_time: _this4.formatDate(new Date(item.updated_at)),
                            status: GHOST_POST_STATUS[item.status] || 0,
                            user_id: user.id,
                            comment_num: 0,
                            allow_comment: item.hasOwnProperty('allow_comment') ? item.allow_comment : 1,
                            is_public: item.hasOwnProperty('visibility') ? Number(item.visibility === 'public') : 1
                          };
                          _context4.next = 7;
                          return _this4.pageModelInstance.addPost(page);

                        case 7:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this4);
                }));

                return function (_x5) {
                  return _ref14.apply(this, arguments);
                };
              }());

              _promise2.default.all(pagesPromise);

              return _context5.abrupt('return', pages.length);

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function page(_x4) {
      return _ref12.apply(this, arguments);
    }

    return page;
  }();

  /**
   * 导入标签
   */


  _class.prototype.tag = function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref16) {
      var _this5 = this;

      var tags = _ref16.tags;
      var tagsPromise;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(!tags || !Array.isArray(tags))) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt('return', 0);

            case 2:
              tagsPromise = tags.map(function (tag) {
                return _this5.tagModelInstance.addTag({
                  name: tag.name,
                  pathname: tag.slug
                });
              });
              _context6.next = 5;
              return _promise2.default.all(tagsPromise);

            case 5:
              return _context6.abrupt('return', tags.length);

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function tag(_x6) {
      return _ref15.apply(this, arguments);
    }

    return tag;
  }();

  /**
   * 导入分类
   */


  _class.prototype.category = function () {
    var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt('return', 0);

            case 1:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function category() {
      return _ref17.apply(this, arguments);
    }

    return category;
  }();

  /**
   * 处理上传文件获取导入数据
   */


  _class.prototype.parseFile = function parseFile(file) {
    try {
      var jsonObj = think.safeRequire(file.path);
      if (Array.isArray(jsonObj.db) && jsonObj.db.length) {
        jsonObj = jsonObj.db[0];
      }
      return jsonObj.data;
    } catch (e) {
      throw Error('INVALID_FILE');
    }
  };

  /**
   * 执行导入
   */


  _class.prototype.run = function () {
    var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(file) {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.importData(this.parseFile(file));

            case 2:
              return _context8.abrupt('return', _context8.sent);

            case 3:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function run(_x7) {
      return _ref18.apply(this, arguments);
    }

    return run;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=ghost.js.map