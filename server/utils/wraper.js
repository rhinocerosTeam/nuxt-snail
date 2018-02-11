/**
 * Created by Cray on 2017/8/17.
 */
import _ from 'lodash'
import Model from '../models';

export const wraper = (model, params) => {

    if(model === Model.plan){
        params = _.pick(params, ['planName', 'startDatetime', 'endDatetime', 'manHour', 'markId', 'markKey', 'result'
            , 'percent']);
        return Object.assign({}, {
            planName: "",
            startDatetime: "",
            endDatetime: "",
            manHour: "",
            markId: "",
            markKey: "",
            result: "0",
            percent: "0",
            create_time: Date.now(),
            update_time:Date.now()
        }, params)
    }
    if(model === Model.record){
        params = _.pick(params, ['planId', 'content', 'start_time', 'end_time',  'persent']);
        return Object.assign({}, {
            planId: "",
            content: "",
            start_time: "",
            end_time: "",
            percent: "0",
            create_time: Date.now(),
        }, params)
    }



    if (model === Model.books) {
        params = _.pick(params, ['title', 'cover', 'html', 'userid', 'markdown', 'categoryid', 'commentid'
        , 'post', 'update_time', 'post_time', 'star']);
        return Object.assign({}, {
            title: "",
            cover: "",
            html: "",
            userid: "",
            markdown: "",
            categoryid: "",
            commentid: "",
            post: "",
            update_time: Date.now(),
            post_time: "",
            star: []
        }, params)
    }

    if (model === Model.category) {
        params = _.pick(params, ['name', 'title', 'update_time', 'total','iconcolor']);
        return Object.assign({}, {
            name: "",
            title: "",
            iconcolor:"",
            update_time: Date.now(),
            total: 0
        }, params)
    }

    if (model === Model.comment) {
        params = _.pick(params, [ 'comments', 'update_time']);
        return Object.assign({}, {
            comments: [],
            update_time: Date.now()
        }, params)
    }

    if (model === Model.user) {
        params = _.pick(params, ['username', 'nickname', 'headimgurl', 'authority'
    ,'reg_time', 'login_time', 'update_time', 'star', 'weixin', 'qq']);
        return Object.assign({}, {
            username: "",
            nickname: "",
            headimgurl: "",
            authority: 0,
            reg_time: "",
            login_time: "",
            update_time: "",
            star: [],
            weixin: {},
            qq: {},
        }, params)
    }
}