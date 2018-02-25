import api from '~/api';
import {WX_HOST} from '~/api/config';
import _ from 'lodash';
import querystring from "querystring";
import url from "url";
let articleTmer = null;
export default {
    nuxtServerInit({commit}, {req}) {

        // if (req.session && req.session.userInfo) {
        //     console.log('1111', req.session.userInfo)
        //     commit('SET_USER', req.session.userInfo)
        // } else {
        //     let param = {
        //         code: querystring.parse(url.parse(req.url).query).code,
        //         appid: WX_HOST.appid,
        //         secret: WX_HOST.secret
        //     }
        //     api.login(param).then((res) => {
        //         //console.log(res.data)
        //         req.session.userInfo = res.data.data
        //         console.log('信息', res.data.data, req.session.userInfo)
        //         commit('SET_USER', res.data)
        //     });

        // }
    },
    /**
     * 点击标签更新菜单目录 {}
     * 点击菜单目录更新
     * @param {String} _id 标签的主键
     * @param {String} name 标签的名称
     * @param {String} index 此标签在上一级标签中的索引
     * @param {String} mindex 点击菜单目录更新 (mindex)
     * **/
    updateMarkMenu({commit, state},data={}){
        let markmenu = null
        if(data.mindex >= -1){ // 切换菜单
            markmenu = state.marksMenu.slice(0,data.mindex+1)

        }else if(data._id){ // 表示第一层
            let {_id,name,index} = data
            markmenu = [{_id,name,index}]

        }else{
            let {name,index} = data
            let nd = state.marksMenu
            nd.push({name,index})
            markmenu = nd
        }

        commit('UPDATE_MARKMENU', markmenu);

        // 设置当前的标签
        let currentMark = state.marksList
        for(let obj of markmenu){
            currentMark = currentMark[obj.index].child
        }
        commit('UPDATE_CURRENTMENU', currentMark);
    },
    updateGlobalMark({commit, state},data={}){
        commit('UPDATE_GLOBALMARK', data);
    },
    addMark(){

    },
    updateMark(){

    },
    deleteMark(){

    },
    initMark({commit, state},data={}){
        if(!state.markIsUpdate){
            api.getMarkList('5a78d90312741b08df2b932b').then((res)=>{
                let  data = api.parse(res)||{};
                commit('UPDATE_MARK', data);
                commit('UPDATE_CURRENTMENU', data);
                commit('UPDATE_MARKSTATUS', true);
            })
        }
    }
}