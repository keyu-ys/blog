'use strict';

var _nodeCrontab = require('node-crontab');

var _nodeCrontab2 = _interopRequireDefault(_nodeCrontab);

require('./global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!think.cli) {

  var syncComment = function syncComment() {
    if (!firekylin.isInstalled) {
      return;
    }
    think.http('/crontab/sync_comment', true);
  };
  _nodeCrontab2.default.scheduleJob('0 */1 * * *', syncComment);

  //服务启动时同步一次
  syncComment();
}
//# sourceMappingURL=crontab.js.map