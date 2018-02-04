export default {
    getUser: state => {
        return state.user
    },
    getArticle: state => {
        return state.article
    },
    getAuthor: state => {
        return state.author
    },
    getLoginState: state => {
        return state.isLogin
    },
    getBookDetail: state => {
        return state.bookDetail
    },
    getMarks:state => {
        return state.marksList
    },
    getMarkMenu:state => {
        return state.marksMenu
    },
    getCurrentMark:state => {
        return state.currentMenu
    }
}