/**
 * Created by user on 2017/12/8.
 */

import axios from '~/plugins/axios';


export default {
    /**
     * 查看标签列表
     * @param
     */
    getMarkList(data) {
        return axios.get('/v1/login', this.GetParamFormat({userId:data}))
    },


}
