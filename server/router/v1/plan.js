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

    if( !params.markId || !params.markKey ){
        res = Serrors.paramsError('传参错误')
    }
    if(!res){
        res = await planCtrl.addUpdatePlan(params)
    }

    ctx.body = res
})

router.post('/updatePlan', async (ctx, next) =>{
    let params = ParamsUtils.bodyValidate(ctx),
        res = null;

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

    if(ParamsUtils.isObjectId(id)){
        data = planCtrl.deletePlan(id)
    }else{
        data = Serrors.paramsError('id传参错误')
    }

    ctx.body = data
})





export default router;