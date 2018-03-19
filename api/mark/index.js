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
        return axios.get('/v1/markList', this.GetParamFormat({userid:data}))
    },
    addMarks(data){
        return axios.post('/v1/addMark', this.PostParamFormat(data))
    },
    updateMarks(data){
        return axios.post('/v1/updateMark', this.PostParamFormat(data))
    },
    deleteMarks(id){
        return axios.post('/v1/deleteMark', this.PostParamFormat({id}))
    }


}
