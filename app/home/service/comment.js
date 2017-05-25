'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_request2.default.defaults({
  strictSSL: false,
  rejectUnauthorized: false
});

var _ = {
  get: think.promisify(_request2.default, _request2.default),
  post: think.promisify(_request2.default.post, _request2.default)
};

var _class = function (_think$service$base) {
  (0, _inherits3.default)(_class, _think$service$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$service$base.apply(this, arguments));
  }

  /**
   * init
   * @return {}         []
   */
  _class.prototype.init = function init() {
    var _think$service$base$p;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_think$service$base$p = _think$service$base.prototype.init).call.apply(_think$service$base$p, [this].concat(args));
  };
  /**
   * sync post comments
   * @return {[type]} [description]
   */


  _class.prototype.sync = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var optionsModel, options, comment;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              optionsModel = this.model('options');
              _context.next = 3;
              return optionsModel.getOptions();

            case 3:
              options = _context.sent;
              comment = options.comment;

              comment.site_url = options.site_url;

              if (!comment.name) {
                _context.next = 21;
                break;
              }

              if (!(comment.type === 'disqus')) {
                _context.next = 11;
                break;
              }

              return _context.abrupt('return', this.syncFromDisqus(comment));

            case 11:
              if (!(comment.type === 'duoshuo')) {
                _context.next = 15;
                break;
              }

              return _context.abrupt('return', this.syncFromDuoshuo(comment));

            case 15:
              if (!(comment.type === 'changyan')) {
                _context.next = 19;
                break;
              }

              return _context.abrupt('return', this.syncFromChangyan(comment));

            case 19:
              if (!(comment.type === 'netease')) {
                _context.next = 21;
                break;
              }

              return _context.abrupt('return', this.syncFromNetease(comment));

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function sync() {
      return _ref.apply(this, arguments);
    }

    return sync;
  }();

  /**
   * get post data
   * @return {[type]} [description]
   */


  _class.prototype.getPostData = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var postModel, allPost, keys;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              postModel = this.model('post');
              _context2.next = 3;
              return postModel.setRelation(false).order('create_time DESC').field('id,pathname,comment_num,type').select();

            case 3:
              allPost = _context2.sent;
              keys = {};

              allPost.map(function (item) {
                var key = think.md5(item.pathname);
                keys[key] = item;
                return key;
              });
              return _context2.abrupt('return', keys);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getPostData() {
      return _ref2.apply(this, arguments);
    }

    return getPostData;
  }();
  /**
   * sync from disqus
   * @return {[type]} [description]
   */


  _class.prototype.syncFromDisqus = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(comment) {
      var _this2 = this;

      var postData, threads, index, ths, url, response, data, promises;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getPostData();

            case 2:
              postData = _context3.sent;

              if (!think.isEmpty(postData)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt('return');

            case 5:
              threads = (0, _keys2.default)(postData); //.join('&l=')

              index = 0;

            case 7:
              if (!true) {
                _context3.next = 30;
                break;
              }

              // eslint-disable-line no-constant-condition
              ths = threads.slice(index, index + 10);

              index += 10;

              if (ths.length) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt('return');

            case 12:
              url = 'https://' + comment.name + '.disqus.com/count-data.js?1=' + ths.join('&1=');
              //think.log(`sync comments ${url}`);

              _context3.next = 15;
              return _.get(url).catch(function () {});

            case 15:
              response = _context3.sent;

              if (response) {
                _context3.next = 18;
                break;
              }

              return _context3.abrupt('continue', 7);

            case 18:
              data = response.body.match(/DISQUSWIDGETS.displayCount\(([^\(\)]+)\);/);

              if (data) {
                _context3.next = 21;
                break;
              }

              return _context3.abrupt('continue', 7);

            case 21:

              data = JSON.parse(data[1]).counts;
              promises = data.map(function (item) {
                if (item.comments === postData[item.id].comment_num) {
                  return;
                }
                var id = postData[item.id].id;
                return _this2.model('post').where({ id: id }).update({ comment_num: item.comments });
              });
              _context3.next = 25;
              return _promise2.default.all(promises);

            case 25:
              if (!promises.length) {
                _context3.next = 28;
                break;
              }

              _context3.next = 28;
              return this.clearPostCache();

            case 28:
              _context3.next = 7;
              break;

            case 30:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function syncFromDisqus(_x) {
      return _ref3.apply(this, arguments);
    }

    return syncFromDisqus;
  }();
  /**
   * sync from duoshuo
   * @return {[type]} [description]
   */


  _class.prototype.syncFromDuoshuo = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(comment) {
      var postData, threads, index, ths, url, response, data, promises, key, id, promise;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.getPostData();

            case 2:
              postData = _context4.sent;

              if (!think.isEmpty(postData)) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt('return');

            case 5:
              threads = (0, _keys2.default)(postData);
              index = 0;

            case 7:
              if (!true) {
                _context4.next = 35;
                break;
              }

              // eslint-disable-line no-constant-condition
              ths = threads.slice(index, index + 10);

              index += 10;

              if (ths.length) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt('return');

            case 12:
              url = 'http://api.duoshuo.com/threads/counts.json?short_name=' + comment.name + '&threads=' + ths.join(',');
              //think.log(`sync comments ${url}`);

              _context4.next = 15;
              return _.get(url);

            case 15:
              response = _context4.sent;
              data = JSON.parse(response.body).response;
              promises = [];
              _context4.t0 = _regenerator2.default.keys(data);

            case 19:
              if ((_context4.t1 = _context4.t0()).done) {
                _context4.next = 28;
                break;
              }

              key = _context4.t1.value;

              if (!(data[key].comments === postData[key].comment_num)) {
                _context4.next = 23;
                break;
              }

              return _context4.abrupt('continue', 19);

            case 23:
              id = postData[key].id;
              promise = this.model('post').where({ id: id }).update({ comment_num: data[key].comments });

              promises.push(promise);
              _context4.next = 19;
              break;

            case 28:
              _context4.next = 30;
              return _promise2.default.all(promises);

            case 30:
              if (!promises.length) {
                _context4.next = 33;
                break;
              }

              _context4.next = 33;
              return this.clearPostCache();

            case 33:
              _context4.next = 7;
              break;

            case 35:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function syncFromDuoshuo(_x2) {
      return _ref4.apply(this, arguments);
    }

    return syncFromDuoshuo;
  }();
  /**
   * sync from changyan
   * @return {[type]} [description]
   */


  _class.prototype.syncFromChangyan = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(comment) {
      var postData, threads, index, ths, url, response, data, promises, key, id, promise;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.getPostData();

            case 2:
              postData = _context5.sent;

              if (!think.isEmpty(postData)) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt('return');

            case 5:
              threads = (0, _keys2.default)(postData);
              index = 0;

            case 7:
              if (!true) {
                _context5.next = 35;
                break;
              }

              // eslint-disable-line no-constant-condition
              ths = threads.slice(index, index + 10);

              index += 10;

              if (ths.length) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt('return');

            case 12:
              url = 'http://changyan.sohu.com/api/2/topic/count?client_id=' + comment.name + '&topic_id=' + ths.join(',');
              //think.log(`sync comments ${url}`);

              _context5.next = 15;
              return _.get(url);

            case 15:
              response = _context5.sent;
              data = JSON.parse(response.body).result;
              promises = [];
              _context5.t0 = _regenerator2.default.keys(data);

            case 19:
              if ((_context5.t1 = _context5.t0()).done) {
                _context5.next = 28;
                break;
              }

              key = _context5.t1.value;

              if (!(data[key].comments === postData[key].comment_num)) {
                _context5.next = 23;
                break;
              }

              return _context5.abrupt('continue', 19);

            case 23:
              id = postData[key].id;
              promise = this.model('post').where({ id: id }).update({ comment_num: data[key].comments });

              promises.push(promise);
              _context5.next = 19;
              break;

            case 28:
              _context5.next = 30;
              return _promise2.default.all(promises);

            case 30:
              if (!promises.length) {
                _context5.next = 33;
                break;
              }

              _context5.next = 33;
              return this.clearPostCache();

            case 33:
              _context5.next = 7;
              break;

            case 35:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function syncFromChangyan(_x3) {
      return _ref5.apply(this, arguments);
    }

    return syncFromChangyan;
  }();
  /**
   * sync from duoshuo
   * @return {[type]} [description]
   */


  _class.prototype.syncFromNetease = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(comment) {
      var postData, site_url, i, post, threads, index, url, ths, formData, resp, data, promises, _i, _post, id;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.getPostData();

            case 2:
              postData = _context6.sent;

              if (!think.isEmpty(postData)) {
                _context6.next = 5;
                break;
              }

              return _context6.abrupt('return');

            case 5:
              site_url = comment.site_url;

              if (site_url.slice(-1) !== '/') {
                site_url = site_url + '/';
              }

              for (i in postData) {
                post = postData[i];

                post.url = site_url + (post.type ? 'page/' : 'post/') + post.pathname + '.html';
              }

              threads = (0, _keys2.default)(postData);
              index = 0;
              url = 'https://api.gentie.163.com/products/' + comment.name + '/threads/joincounts';

            case 11:
              if (!true) {
                _context6.next = 39;
                break;
              }

              // eslint-disable-line no-constant-condition
              ths = threads.slice(index, index + 50);

              if (ths.length) {
                _context6.next = 15;
                break;
              }

              return _context6.abrupt('return');

            case 15:
              index += 50;
              // think.log(`sync comments ${url}`);
              formData = {
                data: (0, _stringify2.default)(ths.map(function (th) {
                  return { url: postData[th].url, sourceId: null };
                }))
              };
              _context6.next = 19;
              return _.post({ url: url, form: formData });

            case 19:
              resp = _context6.sent;
              data = JSON.parse(resp.body).data;
              promises = [];
              _i = 0;

            case 23:
              if (!(_i < ths.length)) {
                _context6.next = 32;
                break;
              }

              _post = postData[ths[_i]];

              if (!(data[_i] === _post.comment_num)) {
                _context6.next = 27;
                break;
              }

              return _context6.abrupt('continue', 29);

            case 27:
              id = _post.id;

              promises.push(this.model('post').where({ id: id }).update({ comment_num: data[_i] }));

            case 29:
              _i++;
              _context6.next = 23;
              break;

            case 32:
              _context6.next = 34;
              return _promise2.default.all(promises);

            case 34:
              if (!promises.length) {
                _context6.next = 37;
                break;
              }

              _context6.next = 37;
              return this.clearPostCache();

            case 37:
              _context6.next = 11;
              break;

            case 39:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function syncFromNetease(_x4) {
      return _ref6.apply(this, arguments);
    }

    return syncFromNetease;
  }();

  _class.prototype.clearPostCache = function clearPostCache() {
    return think.cache('post_1', null);
  };

  return _class;
}(think.service.base);

exports.default = _class;
//# sourceMappingURL=comment.js.map