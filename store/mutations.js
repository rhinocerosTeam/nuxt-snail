// import { stat } from "fs";

export default {
    /* 设置用户信息 */
    SET_USER(state, data) {
        state.user = Object.assign({
            userId: '',
            username: '',
            nickname: '',
            headimgurl: ''
        }, data);
    },
    SET_ARTICLE(state, data) {
        state.article = Object.assign(state.article, data);
        // console.log('deal:', state.article);
    },
    SET_ARTICLE_BookId(state, data) {
        state.article.bookid = data;
    },
    SET_AUTHOR(state, data) {
        state.author = Object.assign(state.author, data);
    },
    INIT_ARTICLE(state, data) {
        state.article = data;
    },
    SET_LOGINSTATE(state, data) {
        state.isLogin = data;
    },
    ADD_VISIT(state, path) {
        let tempState = Object.assign({}, state)
        console.log('----- clinet env -------', process.env.NODE_ENV)
        console.log('----- visit path -------', path)
        console.log('----- current state  -------', tempState)
        state.router.path = path
    },
    SET_BOOKDETIL(state, data) {
        state.bookDetail = Object.assign({}, data);
    },


    /**
     * 更新mark是否更新的状态
     * **/
    UPDATE_MARKSTATUS(state,data){
        state.markIsUpdate = data
    },
    /**
     * 更新标签
     * **/
    UPDATE_MARK(state,data){
        state.markIsUpdate = true
        state.marksList = data
    },
    /**
     * 更新当前的mark数据
     * **/
    UPDATE_CURRENTMENU(state,data){
        state.currentMark = data
    },
    /**
     * 更新mark目录
     * **/
    UPDATE_MARKMENU(state,data){

        console.log('marksMenu------>', data)
        state.marksMenu = data
    },


}