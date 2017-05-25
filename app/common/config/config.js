'use strict';

exports.__esModule = true;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = void 0;
var portFile = think.ROOT_PATH + think.sep + 'port';
if (think.isFile(portFile)) {
  port = _fs2.default.readFileSync(portFile, 'utf8');
}

var host = void 0;
var hostFile = think.ROOT_PATH + think.sep + 'host';
if (think.isFile(hostFile)) {
  host = _fs2.default.readFileSync(hostFile, 'utf8');
}

/**
 * config
 */
exports.default = {
  host: host || process.env.HOST || '0.0.0.0',
  port: port || process.env.PORT || 8360,
  resource_reg: /^(static\/|theme\/|[^\/]+\.(?!js|html|xml)\w+$)/,
  resource_headers: {
    'Cache-Control': 'public, max-age=31536000'
  }
};
//# sourceMappingURL=config.js.map