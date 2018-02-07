export default {
    isLogin: false,
    user: {
        userId:'',
        username: '',
        nickname: '',
        headimgurl: ''
    },
    article: {
        bookid: '',
        markdown: '',
        cover: '',
        categoryid: '',
        html: '',
        firstSetFlag:true
    },
    author: {
        userId: '',
        nickname: '',
        headimgurl: '',
        username: ''
    },
    bookDetail:{

    },
    router: {
        path: ''
    },
    markIsUpdate:false,
    marksList: [], //全部的标签
    marksMenu:[
        // {
        //     key:123,
        //     name:"前段",
        //     index:0
        // }
    ], // 标签目录
    currentMark:[], // 当前的标签目录显示
    globalMark:{}


}