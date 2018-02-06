
const CODE = {
    PARAMS_NULL: 400,   //参数为空
    UNAUTHORIZED: 401,   //用户验证错误
    PARAMS_ERROR: 402,   //参数错误
    OPERATE_ERROR: 403,  //用户操作错误
    CREATE_ERROR: 501,  //创建失败
    FIND_ERROR: 502,  //查询失败
    UPDATE_ERROR: 503,  //更新失败
    DEL_ERROR: 504,  //删除失败
}
const POST_CODE = [CODE.CREATE_ERROR, CODE.FIND_ERROR, CODE.UPDATE_ERROR, CODE.DEL_ERROR]


class Serrors {
    constructor() {

    }
    static paramsNull(msg = '参数为空') {
        return {
            code: CODE.PARAMS_NULL,
            data: null,
            msg
        }
    }

    static paramsError(msg = '参数错误') {
        return {
            code: CODE.PARAMS_ERROR,
            data: null,
            msg
        }
    }

    static createError(msg = '创建失败') {
        return {
            code: CODE.CREATE_ERROR,
            data: null,
            msg
        }
    }

    static findError(msg = '查询失败') {
        return {
            code: CODE.FIND_ERROR,
            data: null,
            msg
        }
    }

    static updateError(msg = '更新失败') {
        return {
            code: CODE.UPDATE_ERROR,
            data: null,
            msg
        }
    }

    static delError(msg = '删除失败') {
        return {
            code: CODE.DEL_ERROR,
            data: null,
            msg
        }
    }

    static operateError(msg = '操作失败') {
        return {
            code: CODE.OPERATE_ERROR,
            data: null,
            msg
        }
    }

    static Unauthorized(msg = '用户验证错误') {
        return {
            code: CODE.UNAUTHORIZED,
            data: null,
            msg
        }
    }
    /**
     * 根据code发送error
     * @param {Object} ctx koa上下文
     * **/
    static postError (ctx) {

        let {code,msg} = ctx.body||{}

        if(POST_CODE.includes(code)){
            console.error(`${ctx.method} ${ctx.header.host+ctx.url} ${ctx.body.msg}`)
        }

    }
}


module.exports = Serrors;