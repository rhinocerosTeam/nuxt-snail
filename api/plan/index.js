/**
 * Created by user on 2017/12/8.
 */

import axios from '~/plugins/axios';


export default {
    /**
     * 查看列表
     */
    getPlanList(data) {
        return axios.get('/v1/planList', this.GetParamFormat(data))
    },


}
