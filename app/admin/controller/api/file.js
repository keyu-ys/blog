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

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_request2.default.defaults({
  strictSSL: false,
  rejectUnauthorized: false
});

var getFileContent = think.promisify(_request2.default.get, _request2.default);
var writeFileAsync = think.promisify(_fs2.default.writeFile, _fs2.default);

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Base.call.apply(_Base, [this].concat(args))), _this), _this.uploadConfig = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.__before = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getUploadConfig();

            case 2:
              this.uploadConfig = _context.sent;

            case 3:
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

  _class.prototype.postAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var config, _config, type, file;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              config = this.uploadConfig;
              _config = config, type = _config.type;
              file = void 0;

              /** 处理远程抓取 **/

              if (!this.post('fileUrl')) {
                _context2.next = 15;
                break;
              }

              _context2.prev = 4;
              _context2.next = 7;
              return this.getUrlFile(this.post('fileUrl'));

            case 7:
              file = _context2.sent;
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](4);
              return _context2.abrupt('return', this.fail(_context2.t0.message));

            case 13:
              _context2.next = 16;
              break;

            case 15:
              file = this.file('file');

            case 16:
              if (file) {
                _context2.next = 18;
                break;
              }

              return _context2.abrupt('return', this.fail('FILE_UPLOAD_ERROR'));

            case 18:
              if (!this.post('importor')) {
                _context2.next = 20;
                break;
              }

              return _context2.abrupt('return', this.serviceImport(this.post('importor'), file));

            case 20:
              if (type) {
                _context2.next = 22;
                break;
              }

              return _context2.abrupt('return', this.fail());

            case 22:
              if (type === 'local') {
                config = { name: this.post('name') };
              }

              return _context2.abrupt('return', this.serviceUpload(type, file.path, config));

            case 24:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 10]]);
    }));

    function postAction() {
      return _ref2.apply(this, arguments);
    }

    return postAction;
  }();

  // 获取上传设置


  _class.prototype.getUploadConfig = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var options;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.model('options').getOptions();

            case 2:
              options = _context3.sent;
              return _context3.abrupt('return', options.upload);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getUploadConfig() {
      return _ref3.apply(this, arguments);
    }

    return getUploadConfig;
  }();

  /**
   * 上传文件
   */


  _class.prototype.serviceUpload = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(service, file, config) {
      var uploader, result;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              uploader = think.service('upload/' + service, 'admin');
              _context4.next = 4;
              return new uploader().run(file, config);

            case 4:
              result = _context4.sent;
              return _context4.abrupt('return', this.success(result));

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4['catch'](0);
              return _context4.abrupt('return', this.fail(_context4.t0 || 'FILE_UPLOAD_ERROR'));

            case 11:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 8]]);
    }));

    function serviceUpload(_x, _x2, _x3) {
      return _ref4.apply(this, arguments);
    }

    return serviceUpload;
  }();

  /**
   * 从其他平台导入数据
   */


  _class.prototype.serviceImport = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(service, file) {
      var importor, _ref6, post, page, category, tag;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              importor = think.service('import/' + service, 'admin');
              _context5.next = 4;
              return new importor(this).run(file);

            case 4:
              _ref6 = _context5.sent;
              post = _ref6.post;
              page = _ref6.page;
              category = _ref6.category;
              tag = _ref6.tag;
              return _context5.abrupt('return', this.success('\u5171\u5BFC\u5165\u6587\u7AE0 ' + post + ' \u7BC7\uFF0C\u9875\u9762 ' + page + ' \u9875\uFF0C\u5206\u7C7B ' + category + ' \u4E2A\uFF0C\u6807\u7B7E ' + tag + ' \u4E2A'));

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5['catch'](0);
              return _context5.abrupt('return', this.fail(_context5.t0));

            case 15:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 12]]);
    }));

    function serviceImport(_x4, _x5) {
      return _ref5.apply(this, arguments);
    }

    return serviceImport;
  }();

  _class.prototype.getUrlFile = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(url) {
      var resp, uploadDir, uploadName, uploadPath;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return getFileContent({
                url: url,
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) Chrome/47.0.2526.111 Safari/537.36'
                },
                strictSSL: false,
                timeout: 1000,
                encoding: 'binary'
              }).catch(function () {
                throw new Error('UPLOAD_URL_ERROR');
              });

            case 2:
              resp = _context6.sent;

              if (!(resp.headers['content-type'].indexOf('image') === -1)) {
                _context6.next = 5;
                break;
              }

              throw new Error('UPLOAD_TYPE_ERROR');

            case 5:
              uploadDir = this.config('post').file_upload_path;

              if (!uploadDir) {
                uploadDir = _path2.default.join(_os2.default.tmpdir(), 'thinkjs/upload');
              }
              if (!think.isDir(uploadDir)) {
                think.mkdir(uploadDir);
              }

              uploadName = think.uuid(20) + _path2.default.extname(url);
              uploadPath = _path2.default.join(uploadDir, uploadName);
              _context6.next = 12;
              return writeFileAsync(uploadPath, resp.body, 'binary');

            case 12:
              return _context6.abrupt('return', {
                fieldName: 'file',
                originalFilename: _path2.default.basename(url),
                path: uploadPath,
                size: resp.headers['content-length']
              });

            case 13:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getUrlFile(_x6) {
      return _ref7.apply(this, arguments);
    }

    return getUrlFile;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=file.js.map