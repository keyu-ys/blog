'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _phpass = require('phpass');

var _post = require('./api/post');

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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Post.call.apply(_Post, [this].concat(args))), _this), _this.postModelInstance = _this.model('post'), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.__before = function () {
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

    function __before() {
      return _ref.apply(this, arguments);
    }

    return __before;
  }();

  _class.prototype.checkAuth = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data) {
      var app_key, auth_key, post, poster, app_secret, passwordHash, result;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              app_key = data.app_key, auth_key = data.auth_key, post = (0, _objectWithoutProperties3.default)(data, ['app_key', 'auth_key']);
              //check user

              _context2.next = 3;
              return this.model('user').where({ app_key: app_key }).find();

            case 3:
              poster = _context2.sent;

              if (!think.isEmpty(poster)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', this.fail('POSTER_NOT_EXIST'));

            case 6:

              this.poster = poster;
              app_secret = poster.app_secret;
              passwordHash = new _phpass.PasswordHash();
              result = passwordHash.checkPassword('' + app_secret + post.markdown_content, auth_key);
              return _context2.abrupt('return', result);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function checkAuth(_x) {
      return _ref2.apply(this, arguments);
    }

    return checkAuth;
  }();

  _class.prototype.updatePost = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(post) {
      var rows;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (post.markdown_content) {
                post = this.postModelInstance.getContentAndSummary(post);
              }
              if (post.create_time) {
                post = this.postModelInstance.getPostTime(post);
              }

              if (!post.tag) {
                _context3.next = 6;
                break;
              }

              _context3.next = 5;
              return this.getTagIds(post.tag);

            case 5:
              post = _context3.sent;

            case 6:
              _context3.next = 8;
              return this.postModelInstance.savePost(post);

            case 8:
              rows = _context3.sent;
              return _context3.abrupt('return', this.success({ affectedRows: rows }));

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function updatePost(_x2) {
      return _ref3.apply(this, arguments);
    }

    return updatePost;
  }();

  _class.prototype.getAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var _get, app_key, auth_key, result;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!this.get('app_key') || !this.get('auth_key'))) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', this.fail('PARAMS_ERROR'));

            case 2:
              _get = this.get(), app_key = _get.app_key, auth_key = _get.auth_key;
              _context4.next = 5;
              return this.checkAuth({ app_key: app_key, auth_key: auth_key, markdown_content: 'Firekylin' });

            case 5:
              result = _context4.sent;
              return _context4.abrupt('return', result ? this.success('KEY_CHECK_SUCCESS') : this.fail('KEY_CHECK_FAILED'));

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getAction() {
      return _ref4.apply(this, arguments);
    }

    return getAction;
  }();

  _class.prototype.postAction = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var post, exPost, insertId;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              post = this.post();

              if (this.checkAuth(post)) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt('return', this.fail('POST_CONTENT_ERROR'));

            case 3:
              _context5.next = 5;
              return this.postModelInstance.where({ pathname: post.pathname }).find();

            case 5:
              exPost = _context5.sent;

              if (think.isEmpty(exPost)) {
                _context5.next = 11;
                break;
              }

              if (!(exPost.user.id !== this.poster.id)) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt('return', this.fail('POST_USER_ERROR'));

            case 9:
              post.id = exPost.id;
              return _context5.abrupt('return', this.updatePost(post));

            case 11:

              post.user_id = this.poster.id;
              _context5.next = 14;
              return this.postModelInstance.getContentAndSummary(post);

            case 14:
              post = _context5.sent;

              post = this.postModelInstance.getPostTime(post);
              _context5.next = 18;
              return this.getTagIds(post.tag);

            case 18:
              post.tag = _context5.sent;


              if (post.status === 3 && this.poster.type !== 1) {
                post.status = 1;
              }

              _context5.next = 22;
              return this.postModelInstance.addPost(post);

            case 22:
              insertId = _context5.sent;
              return _context5.abrupt('return', this.success({ id: insertId }));

            case 24:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function postAction() {
      return _ref5.apply(this, arguments);
    }

    return postAction;
  }();

  _class.prototype.putAction = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
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

    function putAction() {
      return _ref6.apply(this, arguments);
    }

    return putAction;
  }();

  _class.prototype.deleteAction = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deleteAction() {
      return _ref7.apply(this, arguments);
    }

    return deleteAction;
  }();

  return _class;
}(_post2.default);

exports.default = _class;
//# sourceMappingURL=post_push.js.map