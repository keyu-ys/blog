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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _package = require('../../../../package.json');

var _package2 = _interopRequireDefault(_package);

var _base2 = require('./base');

var _base3 = _interopRequireDefault(_base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cluster = require('cluster');

_request2.default.defaults({
  timeout: 1000,
  strictSSL: false,
  rejectUnauthorized: false
});

var reqIns = think.promisify(_request2.default.get);

var _class = function (_base) {
  (0, _inherits3.default)(_class, _base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _base.apply(this, arguments));
  }

  _class.prototype.init = function init(http) {
    _base.prototype.init.call(this, http);

    this.modelInstance = this.model('options');
  };

  _class.prototype.getAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var needUpdate, res, onlineVersion, mysql, data, where;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              needUpdate = false;
              _context.prev = 1;
              _context.next = 4;
              return reqIns('http://firekylin.org/release/.latest');

            case 4:
              res = _context.sent;
              onlineVersion = res.body.trim();

              if (_semver2.default.gt(onlineVersion, _package2.default.version)) {
                needUpdate = onlineVersion;
              }
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](1);

              console.log(_context.t0); // eslint-disable-line no-console

            case 12:
              _context.next = 14;
              return this.modelInstance.query('SELECT VERSION() as version');

            case 14:
              mysql = _context.sent;
              data = {
                nodeVersion: process.versions.node,
                v8Version: process.versions.v8,
                platform: process.platform,
                thinkjsVersion: think.version,
                firekylinVersion: _package2.default.version,
                mysqlVersion: mysql[0].version,
                needUpdate: needUpdate
              };

              //非管理员只统计当前用户文章

              where = this.userInfo.type !== 1 ? { user_id: this.userInfo.id } : {};
              _context.t1 = this;
              _context.t2 = data;
              _context.next = 21;
              return this.getConfig();

            case 21:
              _context.t3 = _context.sent;
              _context.next = 24;
              return this.model('post').where(where).count();

            case 24:
              _context.t4 = _context.sent;
              _context.next = 27;
              return this.model('cate').count();

            case 27:
              _context.t5 = _context.sent;
              _context.next = 30;
              return this.model('post').where(where).sum('comment_num');

            case 30:
              _context.t6 = _context.sent;
              _context.t7 = {
                posts: _context.t4,
                cates: _context.t5,
                comments: _context.t6
              };
              _context.t8 = {
                versions: _context.t2,
                config: _context.t3,
                count: _context.t7
              };
              return _context.abrupt('return', _context.t1.success.call(_context.t1, _context.t8));

            case 34:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 9]]);
    }));

    function getAction() {
      return _ref.apply(this, arguments);
    }

    return getAction;
  }();

  _class.prototype.updateAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var _this2 = this;

      var _get, step, registry;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!/^win/.test(process.platform)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', this.fail('PLATFORM_NOT_SUPPORT'));

            case 2:
              _get = this.get(), step = _get.step;
              _context2.t0 = step;
              _context2.next = _context2.t0 === '1' ? 6 : _context2.t0 === '2' ? 7 : _context2.t0 === '3' ? 8 : _context2.t0 === '4' ? 10 : 6;
              break;

            case 6:
              return _context2.abrupt('return', (0, _request2.default)({ uri: 'http://firekylin.org/release/latest.tar.gz' }).pipe(_fs2.default.createWriteStream(_path2.default.join(think.RESOURCE_PATH, 'latest.tar.gz'))).on('close', function () {
                return _this2.success();
              }).on('error', function (err) {
                return _this2.fail(err);
              }));

            case 7:
              return _context2.abrupt('return', (0, _child_process.exec)('\n          cd ' + think.RESOURCE_PATH + ';\n          tar zvxf latest.tar.gz;\n          cp -r firekylin/* ../;\n          rm -rf firekylin latest.tar.gz', function (error) {
                if (error) {
                  _this2.fail(error);
                }

                _this2.success();
              }));

            case 8:
              registry = think.config('registry') || 'https://registry.npm.taobao.org';
              return _context2.abrupt('return', (0, _child_process.exec)('npm install --registry=' + registry, function (error) {
                if (error) {
                  _this2.fail(error);
                }

                _this2.success();
              }));

            case 10:
              if (cluster.isWorker) {
                this.success();
                setTimeout(function () {
                  return cluster.worker.kill();
                }, 200);
              }

              return _context2.abrupt('break', 12);

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function updateAction() {
      return _ref2.apply(this, arguments);
    }

    return updateAction;
  }();

  _class.prototype.getConfig = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var items, siteConfig;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.modelInstance.select();

            case 2:
              items = _context3.sent;
              siteConfig = {};


              items.forEach(function (item) {
                return siteConfig[item.key] = item.value;
              });

              return _context3.abrupt('return', siteConfig);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getConfig() {
      return _ref3.apply(this, arguments);
    }

    return getConfig;
  }();

  return _class;
}(_base3.default);

exports.default = _class;
//# sourceMappingURL=system.js.map