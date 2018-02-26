
export default {
    db: {
        //mongodb 配置
        DB_DEV: {
            url: 'mongodb://39.106.77.152:27017/snail-dev',
            /*url: 'mongodb://admin:hefantv.123@47.93.89.11:28017/freshbook-dev',*/
            options: {
            }
        },
        DB_TEST: {
            url: 'mongodb://39.106.77.152:27017/snail-dev',
            options: {
            }
        },
        DB_PRO: {
            url: 'mongodb://39.106.77.152:27017/snail',
            options: {
            }
        }
    }
};

