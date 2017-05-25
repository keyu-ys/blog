'use strict';

exports.__esModule = true;

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

var _package = require('../../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  /**
   * init
   * @param  {[type]} http [description]
   * @return {[type]}      [description]
   */
  _class.prototype.init = function init(http) {
    _think$controller$bas.prototype.init.call(this, http);
    //home view path
    this.HOME_VIEW_PATH = '' + think.ROOT_PATH + think.sep + 'view' + think.sep + 'home' + think.sep;
  };
  /**
   * some base method in here
   */


  _class.prototype.__before = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var model, options, navigation, themeConfig, theme, siteUrl, categories, tagModel, tagList, postModel, lastPostList;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.http.action === 'install')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              if (firekylin.isInstalled) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', this.redirect('/index/install'));

            case 4:
              model = this.model('options');
              _context.next = 7;
              return model.getOptions();

            case 7:
              options = _context.sent;

              this.options = options;
              navigation = options.navigation, themeConfig = options.themeConfig;

              try {
                navigation = JSON.parse(navigation);
              } catch (e) {
                navigation = [];
              }
              try {
                themeConfig = JSON.parse(themeConfig);
              } catch (e) {
                themeConfig = {};
              }

              this.assign('options', options);
              this.assign('navigation', navigation);
              this.assign('themeConfig', themeConfig);
              this.assign('VERSION', _package2.default.version);
              //set theme view root path
              theme = options.theme || 'firekylin';

              this.THEME_VIEW_PATH = '' + think.ROOT_PATH + think.sep + 'www' + think.sep + 'theme' + think.sep + theme + think.sep;

              //网站地址
              siteUrl = this.options.site_url;

              if (!siteUrl) {
                siteUrl = 'http://' + this.http.host;
              }
              this.assign('site_url', siteUrl);

              //所有的分类
              _context.next = 23;
              return this.model('cate').getCateArchive();

            case 23:
              categories = _context.sent;

              this.assign('categories', categories);

              // 所有标签
              tagModel = this.model('tag');
              _context.next = 28;
              return tagModel.getTagArchive();

            case 28:
              tagList = _context.sent;

              this.assign('tags', tagList);

              // 最近10条文章
              postModel = this.model('post');
              _context.next = 33;
              return postModel.getLastPostList();

            case 33:
              lastPostList = _context.sent;

              this.assign('lastPostList', lastPostList);

              this.assign('currentYear', new Date().getFullYear());

            case 36:
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
  /**
   * display view page
   * @param  {} name []
   * @return {}      []
   */


  _class.prototype.displayView = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(name) {
      var jsonOutput, assignObj;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.http.url.match(/\.json(?:\?|$)/)) {
                _context2.next = 5;
                break;
              }

              jsonOutput = {}, assignObj = this.assign();

              (0, _keys2.default)(assignObj).forEach(function (key) {
                if (['controller', 'http', 'config', '_', 'options'].indexOf(key) === -1) {
                  jsonOutput[key] = assignObj[key];
                }
              });

              this.type('application/json');
              return _context2.abrupt('return', this.end(jsonOutput));

            case 5:
              return _context2.abrupt('return', this.display(this.THEME_VIEW_PATH + name + '.html'));

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function displayView(_x) {
      return _ref2.apply(this, arguments);
    }

    return displayView;
  }();

  return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=base.js.map