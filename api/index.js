/**
 * Created by Cray on 2017/1/5.
 */

import _ from 'lodash';
import axios from '~/plugins/axios';
import iview from '~/plugins/iview';
import bookApi from './book/index';
import userApi from './user/index';
import wirteApi from './wirte/index';
import commentApi from './comments/index';
import markApi from './mark/index';
import planApi from './plan/index';
import qs from 'qs';

export default Object.assign({

        getAliOssUploadCfg() {
            return axios.get('http://testtools.hefantv.com/api/getFileUploadSignature')
        },
         /**
         * 解析结果
         * @param data
         * @returns {*}
         */
        parse(data) {
            if(_.isObject(data)){
                let result = data["data"] || {};
                if (!_.isObject(result)) {
                    result = JSON.parse(result);
                }
                if (data["status"] !== 200) {
                    return result
                }
                if (result && result["code"] === 200) {
                    return result['data']
                }else {
                    console.error("请求异常：",result['msg'])
                    return null
                }
            }
        },
        /**
         * Get方式格式化参数
         * @param data
         */
        GetParamFormat(data = {}) {
            return {params:data};
        },
        /**
         * Post方式格式化参数
         * @param data
         */
        PostParamFormat(data = {}) {
            return  qs.stringify(data);
        },

    },
    bookApi,
    userApi,
    wirteApi,
    commentApi,
    markApi,
    planApi
)
