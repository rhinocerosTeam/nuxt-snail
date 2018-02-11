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

    addPlan(data){
        return axios.post('/v1/addPlan', this.PostParamFormat(data))
    },
    updatePlan(data){
        return axios.post('/v1/updatePlan', this.PostParamFormat(data))
    },
    deletePlan(id){
        return axios.post('/v1/deletePlan', this.PostParamFormat({id}))
    },

    getRecordList(data) {
        return axios.get('/v1/recordList', this.GetParamFormat(data))
    },
    addRecord(data){
        return axios.post('/v1/addRecord', this.PostParamFormat(data))
    },
    deleteRecord(id){
        return axios.post('/v1/deleteRecord', this.PostParamFormat({id}))
    },

}
