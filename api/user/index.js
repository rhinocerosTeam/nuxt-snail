/**
 * Created by user on 2017/12/8.
 */

import axios from '~/plugins/axios';


export default {
    /**
    * 登录
    * @param
    */
    login(data) {
        return axios.post('/v1/login', this.PostParamFormat(data))
    },
    /**
     * 注销
     * @param
     */
    logout() {
        return axios.post('/v1/logout', this.PostParamFormat())
    },
    /**
     * 登录
     * @param
     */
    register(data) {
        return axios.post('/v1/register', this.PostParamFormat(data))
    },
    checkLogin(data) {
        return axios.get('/v1/checkLogin', this.GetParamFormat(data));
    },
    getUser(data){
        return axios.get('/v1/getUser',this.GetParamFormat(data))
    },
    /**
     * 修改用户信息
     * */
    updateUser(data){
        return axios.post('/v1/updateUser',this.PostParamFormat(data))
    },
    /**
     * 获取用户列表
     * */
    getAllUser(data){
        return axios.get('/v1/getAllUser',this.GetParamFormat(data))
    },
    /**
     * 修改权限
     * */
    updateUserAuth(data){
        return axios.post('/v1/updateUserAuth',this.PostParamFormat(data))
    },

}
