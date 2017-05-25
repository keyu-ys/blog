'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$service$base) {
  (0, _inherits3.default)(_class, _think$service$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$service$base.apply(this, arguments));
  }

  /**
   * init
   * @param  {[type]} info [description]
   * @return {[type]}      [description]
   */
  _class.prototype.init = function init(dbConfig, accountConfig, ip) {
    this.dbConfig = dbConfig;
    this.dbConfig.type = 'mysql';
    this.accountConfig = accountConfig;
    this.ip = ip;
  };
  /**
   * get model
   * @return {[type]} [description]
   */


  _class.prototype.getModel = function getModel(name, module) {
    var dbConfig = void 0;
    if (name === true) {
      dbConfig = think.extend({}, this.dbConfig);
      dbConfig.database = '';
      name = '';
    } else {
      dbConfig = this.dbConfig;
    }
    return this.model(name || 'user', {
      adapter: {
        mysql: dbConfig
      }
    }, module);
  };
  /**
   *
   * @return {[type]} [description]
   */


  _class.prototype.checkDbInfo = function checkDbInfo() {
    var dbInstance = this.getModel(true);
    return dbInstance.query('SELECT VERSION()').catch(function () {
      return _promise2.default.reject('数据库信息有误');
    });
  };
  /**
   * insert data
   * @return {[type]} [description]
   */


  _class.prototype.insertData = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var model, dbExist, dbFile, content, _iterator2, _isArray2, _i2, _ref3, item, promises, optionsModel, salt;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              model = this.getModel(true);
              _context.next = 3;
              return model.query('SELECT `TABLE_NAME` FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA`=\'' + this.dbConfig.database + '\'');

            case 3:
              dbExist = _context.sent;

              if (!think.isEmpty(dbExist)) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return model.query('CREATE DATABASE `' + this.dbConfig.database + '`').catch(function () {});

            case 7:
              dbFile = think.ROOT_PATH + think.sep + 'firekylin.sql';

              if (think.isFile(dbFile)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', _promise2.default.reject('数据库文件（firekylin.sql）不存在，请重新下载'));

            case 10:
              content = _fs2.default.readFileSync(dbFile, 'utf8');

              content = content.split('\n').filter(function (item) {
                item = item.trim();
                var ignoreList = ['#', 'LOCK', 'UNLOCK'];
                for (var _iterator = ignoreList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
                  var _ref2;

                  if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                  } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref2 = _i.value;
                  }

                  var it = _ref2;

                  if (item.indexOf(it) === 0) {
                    return false;
                  }
                }
                return true;
              }).join(' ');
              content = content.replace(/\/\*.*?\*\//g, '').replace(/fk_/g, this.dbConfig.prefix || '');

              //导入数据
              model = this.getModel();
              content = content.split(';');
              _context.prev = 15;
              _iterator2 = content, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

            case 17:
              if (!_isArray2) {
                _context.next = 23;
                break;
              }

              if (!(_i2 >= _iterator2.length)) {
                _context.next = 20;
                break;
              }

              return _context.abrupt('break', 35);

            case 20:
              _ref3 = _iterator2[_i2++];
              _context.next = 27;
              break;

            case 23:
              _i2 = _iterator2.next();

              if (!_i2.done) {
                _context.next = 26;
                break;
              }

              return _context.abrupt('break', 35);

            case 26:
              _ref3 = _i2.value;

            case 27:
              item = _ref3;

              item = item.trim();

              if (!item) {
                _context.next = 33;
                break;
              }

              think.log(item);
              _context.next = 33;
              return model.query(item);

            case 33:
              _context.next = 17;
              break;

            case 35:
              _context.next = 41;
              break;

            case 37:
              _context.prev = 37;
              _context.t0 = _context['catch'](15);

              think.log(_context.t0);
              return _context.abrupt('return', _promise2.default.reject('数据表导入失败，请在控制台下查看具体的错误信息，并在 GitHub 上发 issue。'));

            case 41:

              think.log('before clear data');

              //清除已有的数据内容
              promises = ['cate', 'post', 'post_cate', 'post_tag', 'tag', 'user'].map(function (item) {
                var modelInstance = _this2.getModel(item);
                if (modelInstance) {
                  modelInstance.where('1=1').delete();
                }
              });
              _context.next = 45;
              return _promise2.default.all(promises);

            case 45:
              optionsModel = this.getModel('options');
              _context.next = 48;
              return optionsModel.where('1=1').update({ value: '' });

            case 48:
              salt = think.uuid(10) + '!@#$%^&*';

              this.password_salt = salt;

              _context.next = 52;
              return optionsModel.updateOptions('navigation', (0, _stringify2.default)([{ 'label': '首页', 'url': '/', 'option': 'home' }, { 'label': '归档', 'url': '/archives/', 'option': 'archive' }, { 'label': '标签', 'url': '/tags', 'option': 'tags' }, { 'label': '关于', 'url': '/about', 'option': 'user' }, { 'label': '友链', 'url': '/links', 'option': 'link' }]));

            case 52:
              _context.next = 54;
              return optionsModel.updateOptions('password_salt', salt);

            case 54:
              _context.next = 56;
              return optionsModel.updateOptions('title', 'FireKylin 系统');

            case 56:
              _context.next = 58;
              return optionsModel.updateOptions('logo_url', '/static/img/firekylin.jpg');

            case 58:
              _context.next = 60;
              return optionsModel.updateOptions('theme', 'firekylin');

            case 60:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[15, 37]]);
    }));

    function insertData() {
      return _ref.apply(this, arguments);
    }

    return insertData;
  }();
  /**
   * update config
   * @return {[type]} [description]
   */


  _class.prototype.updateConfig = function updateConfig() {
    var data = {
      type: 'mysql',
      adapter: {
        mysql: this.dbConfig
      }
    };
    var content = '\n      "use strict";\n      exports.__esModule = true;\n      exports.default = ' + (0, _stringify2.default)(data, undefined, 4) + '\n    ';

    var dbConfigFile = void 0;
    try {
      var srcPath = _path2.default.join(think.ROOT_PATH, 'src/common/config');
      _fs2.default.statSync(srcPath);
      dbConfigFile = _path2.default.join(srcPath, 'db.js');
    } catch (e) {
      dbConfigFile = _path2.default.join(think.APP_PATH, '/common/config/db.js');
    }
    _fs2.default.writeFileSync(dbConfigFile, content);
    think.config('db', data);
  };
  /**
   * create account
   * @return {[type]} [description]
   */


  _class.prototype.createAccount = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var password, model, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              password = think.md5(this.password_salt + this.accountConfig.password);
              model = this.getModel('user', 'admin');
              data = {
                username: this.accountConfig.username,
                password: password,
                email: '',
                type: 1,
                status: 1,
                ip: this.ip
              };
              _context2.next = 5;
              return model.addUser(data);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createAccount() {
      return _ref4.apply(this, arguments);
    }

    return createAccount;
  }();
  /**
   * run
   * @return {[type]} [description]
   */


  _class.prototype.run = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var optionsModel;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.checkDbInfo();

            case 2:
              _context3.next = 4;
              return this.insertData();

            case 4:
              _context3.next = 6;
              return this.createAccount();

            case 6:
              this.updateConfig();
              firekylin.setInstalled();
              optionsModel = this.getModel('options');
              _context3.next = 11;
              return optionsModel.getOptions(true);

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function run() {
      return _ref5.apply(this, arguments);
    }

    return run;
  }();

  return _class;
}(think.service.base);

exports.default = _class;
//# sourceMappingURL=install.js.map