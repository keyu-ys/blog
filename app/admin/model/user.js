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

var _phpass = require('phpass');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * model
 */
var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * get password
   * @param  {String} username []
   * @param  {String} salt     []
   * @return {String}          []
   */
  _class.prototype.getEncryptPassword = function getEncryptPassword(password) {
    var passwordHash = new _phpass.PasswordHash();
    var hash = passwordHash.hashPassword(password);
    return hash;
  };
  /**
   * check password
   * @param  {[type]} userInfo [description]
   * @param  {[type]} password [description]
   * @return {[type]}          [description]
   */


  _class.prototype.checkPassword = function checkPassword(userInfo, password) {
    var passwordHash = new _phpass.PasswordHash();
    return passwordHash.checkPassword(password, userInfo.password);
  };

  _class.prototype.generateKey = function generateKey(userId, app_key, app_secret, status) {
    var data = { app_key: app_key, app_secret: app_secret };
    if (status) {
      data.status = status;
    }
    this.where({ id: userId }).update(data);
  };

  /**
   * after select
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */


  _class.prototype.afterSelect = function afterSelect(data) {
    var _this2 = this;

    return data.map(function (item) {
      return _this2.afterFind(item);
    });
  };

  _class.prototype.afterFind = function afterFind(data) {
    if (data.create_time) {
      data.create_time = think.datetime(new Date(data.create_time));
    }
    if (data.last_login_time) {
      data.last_login_time = think.datetime(new Date(data.last_login_time));
    }
    return data;
  };
  /**
   * 添加用户
   * @param {[type]} data [description]
   * @param {[type]} ip   [description]
   */


  _class.prototype.addUser = function addUser(data, ip) {
    var create_time = think.datetime();
    var encryptPassword = this.getEncryptPassword(data.password);
    return this.where({ name: data.username, email: data.email, _logic: 'OR' }).thenAdd({
      name: data.username,
      email: data.email,
      display_name: data.display_name,
      password: encryptPassword,
      create_time: create_time,
      last_login_time: create_time,
      create_ip: ip,
      last_login_ip: ip,
      type: data.type,
      status: data.status
    });
  };
  /**
   * 保存用户信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */


  _class.prototype.saveUser = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data, ip) {
      var info, password, updateData, count;
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

              return _context.abrupt('return', _promise2.default.reject(new Error('UESR_NOT_EXIST')));

            case 5:
              password = data.password;

              if (password) {
                password = this.getEncryptPassword(password);
              }
              updateData = {};

              ['display_name', 'type', 'status'].forEach(function (item) {
                if (data[item]) {
                  updateData[item] = data[item];
                }
              });
              if (password) {
                updateData.password = password;
              }

              if (!think.isEmpty(updateData)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', _promise2.default.reject('DATA_EMPTY'));

            case 12:
              if (!(!info.email && data.email)) {
                _context.next = 17;
                break;
              }

              _context.next = 15;
              return this.where({ email: data.email }).count('email');

            case 15:
              count = _context.sent;

              if (!count) {
                updateData.email = data.email;
              }

            case 17:
              updateData.last_login_time = think.datetime();
              updateData.last_login_ip = ip;
              return _context.abrupt('return', this.where({ id: data.id }).update(updateData));

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function saveUser(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return saveUser;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=user.js.map