'use strict';

exports.__esModule = true;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cluster = require('cluster');

var statsAsync = think.promisify(_fs2.default.stat);
var readdirAsync = think.promisify(_fs2.default.readdir);
var readFileAsync = think.promisify(_fs2.default.readFile);
var writeFileAsync = think.promisify(_fs2.default.writeFile);
var THEME_DIR = _path2.default.join(think.RESOURCE_PATH, 'theme');

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * forbidden ../ style path
   */
  _class.prototype.pathCheck = function pathCheck(themePath) {
    var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : THEME_DIR;

    if (themePath.indexOf(basePath) !== 0) {
      this.fail();
      throw Error('theme path ' + themePath + ' error');
    }
    return true;
  };

  _class.prototype.getAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _get, theme, themePath, files, _get2, filePath, file;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = this.get('type');
              _context.next = _context.t0 === 'fileList' ? 3 : _context.t0 === 'file' ? 10 : _context.t0 === 'templateList' ? 17 : _context.t0 === 'themeList' ? 20 : 20;
              break;

            case 3:
              _get = this.get(), theme = _get.theme;
              themePath = _path2.default.join(THEME_DIR, theme);

              this.pathCheck(themePath);

              _context.next = 8;
              return this.getFileList(themePath);

            case 8:
              files = _context.sent;
              return _context.abrupt('return', this.success(files));

            case 10:
              _get2 = this.get(), filePath = _get2.filePath;

              filePath = _path2.default.join(THEME_DIR, filePath);
              this.pathCheck(filePath);

              _context.next = 15;
              return readFileAsync(filePath, { encoding: 'utf-8' });

            case 15:
              file = _context.sent;
              return _context.abrupt('return', this.success(file));

            case 17:
              _context.next = 19;
              return this.getPageTemplateList();

            case 19:
              return _context.abrupt('return', _context.sent);

            case 20:
              _context.next = 22;
              return this.getThemeList();

            case 22:
              return _context.abrupt('return', _context.sent);

            case 23:
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

  _class.prototype.updateAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var _post, filePath, content;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _post = this.post(), filePath = _post.filePath, content = _post.content;

              filePath = _path2.default.join(THEME_DIR, filePath);
              this.pathCheck(filePath);

              _context2.prev = 3;
              _context2.next = 6;
              return writeFileAsync(filePath, content, { encoding: 'utf-8' });

            case 6:

              if (cluster.isWorker) {
                setTimeout(function () {
                  return cluster.worker.kill();
                }, 200);
              }
              this.success();
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](3);
              return _context2.abrupt('return', this.fail(_context2.t0));

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 10]]);
    }));

    function updateAction() {
      return _ref2.apply(this, arguments);
    }

    return updateAction;
  }();

  /**
   * Fork theme
   */


  _class.prototype.putAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var _post2, theme, new_theme, themeDir, newThemeDir, configPath, config;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _post2 = this.post(), theme = _post2.theme, new_theme = _post2.new_theme;
              themeDir = _path2.default.join(THEME_DIR, theme);
              newThemeDir = _path2.default.join(THEME_DIR, new_theme);

              this.pathCheck(themeDir) && this.pathCheck(newThemeDir);

              _context3.prev = 4;
              _context3.next = 7;
              return statsAsync(newThemeDir);

            case 7:
              return _context3.abrupt('return', this.fail(new_theme + ' \u5DF2\u5B58\u5728\uFF0C\u8BF7\u624B\u52A8\u5207\u6362\u5230\u8BE5\u4E3B\u9898'));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](4);

              (0, _child_process.execSync)('cp -r ' + themeDir + ' ' + newThemeDir);

              configPath = _path2.default.join(newThemeDir, 'package.json');
              config = think.require(configPath);

              config.name = new_theme;

              _context3.prev = 16;
              _context3.next = 19;
              return writeFileAsync(configPath, (0, _stringify2.default)(config, null, '\t'), { encoding: 'utf-8' });

            case 19:
              _context3.next = 21;
              return this.model('options').updateOptions('theme', new_theme);

            case 21:
              return _context3.abrupt('return', this.success());

            case 24:
              _context3.prev = 24;
              _context3.t1 = _context3['catch'](16);
              return _context3.abrupt('return', this.fail(_context3.t1));

            case 27:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[4, 10], [16, 24]]);
    }));

    function putAction() {
      return _ref3.apply(this, arguments);
    }

    return putAction;
  }();

  /**
   * 递归获取文件夹树
   */


  _class.prototype.getFileList = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(base) {
      var result, files, _iterator, _isArray, _i, _ref5, file, pos, stat;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              result = [];
              _context4.next = 3;
              return readdirAsync(base);

            case 3:
              files = _context4.sent;
              _iterator = files, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

            case 5:
              if (!_isArray) {
                _context4.next = 11;
                break;
              }

              if (!(_i >= _iterator.length)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt('break', 31);

            case 8:
              _ref5 = _iterator[_i++];
              _context4.next = 15;
              break;

            case 11:
              _i = _iterator.next();

              if (!_i.done) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt('break', 31);

            case 14:
              _ref5 = _i.value;

            case 15:
              file = _ref5;
              pos = _path2.default.join(base, file);
              _context4.next = 19;
              return statsAsync(pos);

            case 19:
              stat = _context4.sent;

              if (!stat.isDirectory()) {
                _context4.next = 28;
                break;
              }

              _context4.t0 = result;
              _context4.t1 = file;
              _context4.next = 25;
              return this.getFileList(pos);

            case 25:
              _context4.t2 = _context4.sent;
              _context4.t3 = {
                module: _context4.t1,
                children: _context4.t2
              };

              _context4.t0.push.call(_context4.t0, _context4.t3);

            case 28:

              if (stat.isFile()) {
                result.push({ module: file });
              }

            case 29:
              _context4.next = 5;
              break;

            case 31:
              return _context4.abrupt('return', result);

            case 32:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getFileList(_x2) {
      return _ref4.apply(this, arguments);
    }

    return getFileList;
  }();

  /**
   * 获取主题列表
   */


  _class.prototype.getThemeList = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var themes, result, _iterator2, _isArray2, _i2, _ref7, theme, infoFile;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return readdirAsync(THEME_DIR);

            case 2:
              themes = _context5.sent;
              result = [];
              _iterator2 = themes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

            case 5:
              if (!_isArray2) {
                _context5.next = 11;
                break;
              }

              if (!(_i2 >= _iterator2.length)) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt('break', 28);

            case 8:
              _ref7 = _iterator2[_i2++];
              _context5.next = 15;
              break;

            case 11:
              _i2 = _iterator2.next();

              if (!_i2.done) {
                _context5.next = 14;
                break;
              }

              return _context5.abrupt('break', 28);

            case 14:
              _ref7 = _i2.value;

            case 15:
              theme = _ref7;
              infoFile = _path2.default.join(THEME_DIR, theme, 'package.json');
              _context5.prev = 17;
              _context5.next = 20;
              return statsAsync(infoFile);

            case 20:
              result.push(think.extend({ id: theme }, think.require(infoFile)));
              _context5.next = 26;
              break;

            case 23:
              _context5.prev = 23;
              _context5.t0 = _context5['catch'](17);

              console.log(_context5.t0); // eslint-disable-line no-console

            case 26:
              _context5.next = 5;
              break;

            case 28:
              return _context5.abrupt('return', this.success(result));

            case 29:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[17, 23]]);
    }));

    function getThemeList() {
      return _ref6.apply(this, arguments);
    }

    return getThemeList;
  }();

  /**
   * 获取主题的自定义模板
   */


  _class.prototype.getPageTemplateList = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var _get3, theme, templatePath, templates, stat;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _get3 = this.get(), theme = _get3.theme;
              templatePath = _path2.default.join(THEME_DIR, theme, 'template');

              this.pathCheck(templatePath);

              templates = [];
              _context6.prev = 4;
              _context6.next = 7;
              return statsAsync(templatePath);

            case 7:
              stat = _context6.sent;

              if (stat.isDirectory()) {
                _context6.next = 10;
                break;
              }

              throw Error();

            case 10:
              _context6.next = 15;
              break;

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6['catch'](4);
              return _context6.abrupt('return', this.success(templates));

            case 15:
              _context6.next = 17;
              return readdirAsync(templatePath);

            case 17:
              templates = _context6.sent;

              templates = templates.filter(function (t) {
                return (/\.html$/.test(t)
                );
              });
              return _context6.abrupt('return', this.success(templates));

            case 20:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[4, 12]]);
    }));

    function getPageTemplateList() {
      return _ref8.apply(this, arguments);
    }

    return getPageTemplateList;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=theme.js.map