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

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _markdownToc = require('markdown-toc');

var _markdownToc2 = _interopRequireDefault(_markdownToc);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * relation model
 */
var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * init
   * @param  {} args []
   * @return {}         []
   */
  _class.prototype.init = function init() {
    var _Base$prototype$init;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_Base$prototype$init = _Base.prototype.init).call.apply(_Base$prototype$init, [this].concat(args));

    this.relation = {
      tag: think.model.MANY_TO_MANY,
      cate: think.model.MANY_TO_MANY,
      user: {
        type: think.model.BELONG_TO,
        // fKey: 'user_id',
        // key: 'display_name',
        field: 'id,name,display_name'
      }
    };
  };

  /**
   * 添加文章
   * @param {[type]} data [description]
   * @param {[type]} ip   [description]
   */


  _class.prototype.addPost = function addPost(data) {
    var create_time = think.datetime();
    data = (0, _assign2.default)({
      type: 0,
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
              return this.where({ id: data.id }).find();

            case 2:
              info = _context.sent;

              if (!think.isEmpty(info)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', _promise2.default.reject(new Error('POST_NOT_EXIST')));

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

  _class.prototype.deletePost = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(post_id) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', this.where({ id: post_id }).delete());

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function deletePost(_x2) {
      return _ref2.apply(this, arguments);
    }

    return deletePost;
  }();

  /**
   * get count posts
   * @param  {Number} userId []
   * @return {Promise}        []
   */


  _class.prototype.getCount = function getCount(userId) {
    if (userId) {
      return this.where({ user_id: userId }).count();
    }
    return this.count();
  };
  /**
   * get latest posts
   * @param  {Number} nums []
   * @return {}      []
   */


  _class.prototype.getLatest = function getLatest(user_id) {
    var nums = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    var where = {
      create_time: { '<=': think.datetime() },
      is_public: 1, //公开
      type: 0, //文章
      status: 3 };
    if (user_id) {
      where.user_id = user_id;
    }
    return this.order('id DESC').where(where).limit(nums).setRelation(false).order('create_time DESC').select();
  };

  _class.prototype.afterUpdate = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(data, options) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _Base.prototype.afterUpdate.call(this, data, options);

            case 2:
              return _context3.abrupt('return', this.clearCache());

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function afterUpdate(_x4, _x5) {
      return _ref3.apply(this, arguments);
    }

    return afterUpdate;
  }();

  _class.prototype.afterDelete = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(data, options) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _Base.prototype.afterDelete.call(this, data, options);

            case 2:
              return _context4.abrupt('return', this.clearCache());

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function afterDelete(_x6, _x7) {
      return _ref4.apply(this, arguments);
    }

    return afterDelete;
  }();

  _class.prototype.afterAdd = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data, options) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _Base.prototype.afterAdd.call(this, data, options);

            case 2:
              return _context5.abrupt('return', this.clearCache());

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function afterAdd(_x8, _x9) {
      return _ref5.apply(this, arguments);
    }

    return afterAdd;
  }();

  _class.prototype.clearCache = function clearCache() {
    think.log('clear cache');
    return think.cache('post_1', null);
  };

  /**
   * 更新所有文章的摘要信息并重新保存到数据库
   *
   * @returns {Promise.<void>}
   */


  _class.prototype.updateAllPostSummaries = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var posts, allPromises, i, item, summary;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.field('id, markdown_content').setRelation(false).select();

            case 2:
              posts = _context6.sent;
              allPromises = [];

              if (!(posts.length > 0)) {
                _context6.next = 17;
                break;
              }

              i = 0;

            case 6:
              if (!(i < posts.length)) {
                _context6.next = 15;
                break;
              }

              item = posts[i];
              _context6.next = 10;
              return this.getSummary(item.markdown_content);

            case 10:
              summary = _context6.sent;


              allPromises.push(this.where({ id: item.id }).update({ summary: summary }));

            case 12:
              i++;
              _context6.next = 6;
              break;

            case 15:
              _context6.next = 17;
              return _promise2.default.all(allPromises);

            case 17:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function updateAllPostSummaries() {
      return _ref6.apply(this, arguments);
    }

    return updateAllPostSummaries;
  }();

  /**
   * 渲染 markdown
   * 摘要为部分内容时不展示 TOC
   * 文章正文设置为手动指定 TOC 时不显示
   * 页面不自动生成 TOC 除非是手动指定了
   */


  _class.prototype.getContentAndSummary = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(data) {
      var options, postTocManual, auto_summary, showToc, hasMoreTag, summary;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.model('options').getOptions();

            case 2:
              options = _context7.sent;
              postTocManual = options.postTocManual === '1';
              auto_summary = parseInt(options.auto_summary);
              showToc = void 0;

              if (!postTocManual) {
                showToc = data.type / 1 === 0;
              } else {
                showToc = /(?:^|[\r\n]+)\s*\<\!--toc--\>\s*[\r\n]+/i.test(data.markdown_content);
              }
              data.content = this.markdownToHtml(data.markdown_content, { toc: showToc, highlight: true });

              hasMoreTag = /(?:^|[\r\n]+)\s*\<\!--more--\>\s*[\r\n]+/i.test(data.markdown_content);


              if (hasMoreTag || auto_summary === 0) {
                data.summary = data.markdown_content.split('<!--more-->')[0];
                data.summary = this.markdownToHtml(data.summary, { toc: false, highlight: true });
                data.summary.replace(/<[>]*>/g, '');
              } else {
                summary = this.markdownToHtml(data.markdown_content, { toc: false, highlight: true });
                // 过滤掉 HTML 标签并截取所需的长度

                data.summary = summary.replace(/<\/?[^>]*>/g, '').substr(0, auto_summary) + '...';
              }

              return _context7.abrupt('return', data);

            case 11:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getContentAndSummary(_x10) {
      return _ref7.apply(this, arguments);
    }

    return getContentAndSummary;
  }();

  /**
   * 渲染 markdown 并返回摘要内容
   * 区别于 getContentAndSummary 方法，此方法只处理和返回摘要
   *
   * @param markdown_content MarkDown 内容
   * @param summary_length 摘要长度（可为空）
   */


  _class.prototype.getSummary = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(markdown_content, summary_length) {
      var summary, options, hasMoreTag;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              summary = void 0;

              if (summary_length) {
                _context8.next = 6;
                break;
              }

              _context8.next = 4;
              return this.model('options').getOptions();

            case 4:
              options = _context8.sent;

              summary_length = parseInt(options.auto_summary);

            case 6:
              hasMoreTag = /(?:^|[\r\n]+)\s*\<\!--more--\>\s*[\r\n]+/i.test(markdown_content);


              if (hasMoreTag || summary_length === 0) {
                summary = markdown_content.split('<!--more-->')[0];
                summary = this.markdownToHtml(summary, { toc: false, highlight: true });
                summary.replace(/<[>]*>/g, '');
              } else {
                summary = this.markdownToHtml(markdown_content, { toc: false, highlight: true });
                // 过滤掉 HTML 标签 及换行、空格等 并截取所需的长度
                summary = summary.replace(/<\/?[^>]*>/g, '').replace(/[\n\s\t]/g, '').substr(0, summary_length) + '...';
              }

              return _context8.abrupt('return', summary);

            case 9:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getSummary(_x11, _x12) {
      return _ref8.apply(this, arguments);
    }

    return getSummary;
  }();

  /**
   * markdown to html
   * @return {} []
   */


  _class.prototype.markdownToHtml = function markdownToHtml(content) {
    var _this2 = this;

    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { toc: true, highlight: true };

    var markedContent = (0, _marked2.default)(content);

    /**
     * 增加 TOC 目录
     */
    if (option.toc) {
      var tocContent = (0, _marked2.default)((0, _markdownToc2.default)(content).content).replace(/<a\s+href="#([^\"]+)">([^<>]+)<\/a>/g, function (a, b, c) {
        return '<a href="#' + _this2.generateTocName(c) + '">' + c + '</a>';
      });

      markedContent = markedContent.replace(/<h(\d)[^<>]*>(.*?)<\/h\1>/g, function (a, b, c) {
        return '<h' + b + '><a id="' + _this2.generateTocName(c) + '" class="anchor" href="#' + _this2.generateTocName(c) + '"></a>' + c + '</h' + b + '>';
      });
      markedContent = '<div class="toc">' + tocContent + '</div>' + markedContent;
    }

    /**
     * 增加代码高亮
     */
    if (option.highlight) {
      markedContent = markedContent.replace(/<pre><code\s*(?:class="lang-(\w+)")?>([\s\S]+?)<\/code><\/pre>/mg, function (a, language, text) {
        text = text.replace(/&#39;/g, '\'').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\&quot;/g, '"').replace(/\&amp;/g, '&');
        var result = _highlight2.default.highlightAuto(text, language ? [language] : undefined);
        return '<pre><code class="hljs lang-' + result.language + '">' + result.value + '</code></pre>';
      });
    }

    return markedContent;
  };

  /**
   * 获取文章创建时间
   *
   * @param data
   * @returns {*}
   */


  _class.prototype.getPostTime = function getPostTime(data) {
    data.update_time = think.datetime();
    if (!data.create_time) {
      data.create_time = data.update_time;
    } else {
      data.create_time = think.datetime(data.create_time);
    }
    return data;
  };

  /**
   * generate toc name
   * @param  {String} name []
   * @return {String}      []
   */


  _class.prototype.generateTocName = function generateTocName(name) {
    name = name.trim().replace(/\s+/g, '').replace(/\)/g, '').replace(/[\(\,]/g, '-').toLowerCase();
    if (/^[\w\-]+$/.test(name)) {
      return name;
    }
    return 'toc-' + think.md5(name).slice(0, 3);
  };

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=post.js.map