/**
 * Created by songpeilan on 2018/2/8.
 */
import Router from  "koa-router"
import ParamsUtils from '../../utils/params'
import {recordCtrl} from '../../controls/record'
import Serrors from '../../utils/serrors'
const router = new Router()

/**
 * 得到标签列表
 */
router.get('/recordList', async (ctx, next) => {
    let {planId} = ParamsUtils.queryValidate(ctx) || {},
        data = null;

    if(ParamsUtils.isObjectId(planId)){
        data = await recordCtrl.recordList({planId})
    }else{
        data = Serrors.paramsError(`传参错误 planId:${ParamsUtils.isObjectId(planId)}`)
    }
    ctx.body = data
})

/**
 * 添加
 */
router.post('/addRecord', async (ctx, next) =>{
    let params = ParamsUtils.bodyValidate(ctx),
        res = null;

    if( !params.planId || !params.content ){
        res = Serrors.paramsError('传参错误')
    }
    if(!res){
        res = await recordCtrl.addUpdateRecord(params)
    }

    ctx.body = res
})




router.post('/deleteRecord', async (ctx, next) =>{
    let {id} = ParamsUtils.bodyValidate(ctx),
        data = null;

    if(ParamsUtils.isObjectId(id)){
        data = recordCtrl.deletePlan(id)
    }else{
        data = Serrors.paramsError('id传参错误')
    }

    ctx.body = data
})





export default router;