/**
 * Created by songpeilan on 2018/3/3.
 */


/**
 * Created by songpeilan on 2018/2/8.
 */
import Router from  "koa-router"
import ParamsUtils from '../../utils/params'
import {userCtrl} from '../../controls/user'
import Serrors from '../../utils/serrors'
const router = new Router()

/**
 * 登录
 * */
router.post('/login', async(ctx, next) => {
    let {username, password} = ParamsUtils.bodyValidate(ctx) || {},
        data = null;

    if (!username || !password) {
        data = Serrors.paramsError()
    } else {
        data = await userCtrl.login({username, password}, ctx)
    }

    ctx.body = data
})

/**
 * 注册
 * */
router.post('/register', async(ctx, next) => {
    let {username, password} = ParamsUtils.bodyValidate(ctx) || {},
        data = null;

    if (!username || !password) {
        data = Serrors.paramsError()
    } else {
        data = await userCtrl.register({username, password}, ctx)
    }

    ctx.body = data
})




export default router;