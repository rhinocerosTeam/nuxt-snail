/**
 * Created by songpeilan on 2018/2/8.
 */
import Router from  "koa-router"
import ParamsUtils from '../../utils/params'
import {planCtrl} from '../../controls/plan'
import Serrors from '../../utils/serrors'
const router = new Router()

/**
 * 得到标签列表
 */
router.get('/planList', async (ctx, next) => {
    let {markId, markKey, type} = ParamsUtils.queryValidate(ctx) || {},
        data = null;

    if(!ParamsUtils.checkLogin(ctx)){
        return
    }

    if((markId && (!ParamsUtils.isObjectId(markId) || !markKey) )|| !type){
        data = Serrors.paramsError(`传参错误 markId:${ParamsUtils.isObjectId(markId)} markKey:${markKey} type ${type}`)
    }else{
        let condition = {}

        if(markId){
            condition={
                markId,
                markKey
            }
        }
        if(ctx.session.user && ctx.session.user._id){
            condition.userid = ctx.session.user._id
        }

        data = await planCtrl.planList(condition,type)
    }
    ctx.body = data
})

/**
 * 添加
 */
router.post('/addPlan', async (ctx, next) =>{
    let params = ParamsUtils.bodyValidate(ctx),
        res = null;

    if(!ParamsUtils.checkLogin(ctx)){
        return
    }


    if( !params.markId || !params.markKey ){
        res = Serrors.paramsError('传参错误')
    }
    if(!res){

        if(ctx.session.user && ctx.session.user._id){
            params.userid = ctx.session.user._id
        }

        res = await planCtrl.addUpdatePlan(params)
    }

    ctx.body = res
})

router.post('/updatePlan', async (ctx, next) =>{
    let params = ParamsUtils.bodyValidate(ctx),
        res = null;

    if(!ParamsUtils.checkLogin(ctx)){
        return
    }

    if(!ParamsUtils.isObjectId(params._id) || !params.markId || !params.markKey){
        res = Serrors.paramsError('传参错误')
    }

    if(!res){

        res = await planCtrl.addUpdatePlan(params)
    }

    ctx.body = res
})


router.post('/deletePlan', async (ctx, next) =>{
    let {id} = ParamsUtils.bodyValidate(ctx),
        data = null;
    if(!ParamsUtils.checkLogin(ctx)){
        return
    }
    if(ParamsUtils.isObjectId(id)){
        data = planCtrl.deletePlan(id)
    }else{
        data = Serrors.paramsError('id传参错误')
    }

    ctx.body = data
})





export default router;