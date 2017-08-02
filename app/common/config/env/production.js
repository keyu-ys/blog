'use strict';

exports.__esModule = true;
exports.default = {
    cluster_on: 2,
    db: { //开发模式下数据库配置
        type: "mysql",
        adapter: {
            mysql: {
                "host": "172.18.233.255",
                "port": "3306",
                "database": "blog",
                "user": "root",
                "password": "a13660858829",
                "prefix": "fk_",
                "type": "mysql"
            }
        }
    }
};
//# sourceMappingURL=production.js.map