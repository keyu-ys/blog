'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.firekylin = {
  POST_PUBLIC: 1,
  POST_ALLOW_COMMENT: 1,
  POST_ARTICLE: 0,
  POST_PAGE: 1,
  POST_DRAFT: 0,
  POST_AUDITING: 1,
  POST_REJECT: 2,
  POST_PUBLISH: 3,
  USER_ADMIN: 1,
  USER_EDITOR: 2,
  USER_CONTRIBUTOR: 3,
  USER_AVAILABLE: 1,
  USER_DISABLED: 2
};

/**
 * is installed
 * @type {Boolean}
 */
/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */
firekylin.isInstalled = false;
try {
  var installedFile = think.ROOT_PATH + think.sep + '.installed';
  if (_fs2.default.accessSync && _fs2.default.accessSync(installedFile, _fs2.default.F_OK)) {
    firekylin.isInstalled = true;
  }
  if (_fs2.default.existsSync(installedFile)) {
    firekylin.isInstalled = true;
  }
} catch (e) {}
// fs.accessSync failed


/**
 * set app is installed
 * @return {[type]} [description]
 */
firekylin.setInstalled = function () {
  firekylin.isInstalled = true;
  var installedFile = think.ROOT_PATH + think.sep + '.installed';
  _fs2.default.writeFileSync(installedFile, 'firekylin');
};
//# sourceMappingURL=global.js.map