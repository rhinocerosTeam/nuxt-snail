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
    setUser: (context, data = {}) => {
        context.commit('SET_USER', data)
    },
    setArticle: ({commit, state}, data = {}) => {
        commit('SET_ARTICLE', data);
    },
    updateDraft({commit, state}, data = {}){
        let {article, user} = state;
        let params = {
            userid: user.userId || ''
        }
        Object.assign(params, article, data);
        if(!params.markdown && !params.cover && !params.title && !params.html) return

        clearTimeout(articleTmer);
        articleTmer = setTimeout(() => {
            api.updateDraft(params).then((res) => {
                let _data = api.parse(res)||{};
                if (_data['_id']) {
                    let bookid = _data['_id'];
                    // params['bookid'] = _data['_id'];
                    commit('SET_ARTICLE', {bookid});
                }
            })
        }, 500)
    },
    setAuthor: (context, data = {}) => {
        context.commit('SET_AUTHOR', data);
    },
    initArticle: ({commit, state}, data = {}) => {
        commit('INIT_ARTICLE', data);
    },
    setLoginState: (context, data = {}) => {
        context.commit('SET_LOGINSTATE', data);
    },
    setBookDetil:(context, data = {}) => {
        context.commit('SET_BOOKDETIL', data);
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
        if(data.mindex >= 0){ // 切换菜单
            console.log('--->',state.marksMenu)
            markmenu = state.marksMenu.slice(0,data.mindex)

        }else if(data._id){ // 表示第一层
            let {_id,name,index} = data
            markmenu = [{_id,name,index}]

        }else{
            let {name,index} = data

            let nd = [...state.marksMenu]
            console.log('nd--->',nd)

            nd.push({name,index})
            markmenu = nd

            console.log('markmenu--->',markmenu)

        }
        commit('UPDATE_MARKMENU', markmenu);

        // 设置当前的标签
        let currentMark = state.marksList
        for(let obj of markmenu){
            currentMark = currentMark[obj.index].child
        }
        commit('UPDATE_CURRENTMENU', currentMark);
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