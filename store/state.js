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
    marksList: [
        {
            _id:"2312312fgg33333",
            key:123,
            name:"前段",
            child:[
                {
                    key:1,
                    name:"node",
                },
                {
                    key:2,
                    name:"H5",
                }
            ]

        },
        {
            _id:"2312312fgg33333",
            key:123,
            name:"java",
            child:[
                {
                    key:1,
                    name:"node",
                },
                {
                    key:2,
                    name:"H5",
                }
            ]

        }
    ],
    marksMenu:[
        // {
        //     key:123,
        //     name:"前段",
        //     index:0
        // }
    ],
    currentMenu:[{
        _id:"2312312fgg33333",
        key:123,
        name:"前段",
        child:[
            {
                key:1,
                name:"node",
            },
            {
                key:2,
                name:"H5",
            }
        ]

    },
        {
            _id:"2312312fgg33333",
            key:123,
            name:"java",
            child:[
                {
                    key:1,
                    name:"node",
                },
                {
                    key:2,
                    name:"H5",
                }
            ]

        }]
}