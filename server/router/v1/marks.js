import Router from  "koa-router"
import ParamsUtils from '../../utils/params'
import {marksCtrl} from '../../controls/marks'
import Serrors from '../../utils/serrors'
const router = new Router()

/**
 * 得到标签列表
 */
router.get('/markList', async (ctx, next) => {
    let {userid} = ParamsUtils.queryValidate(ctx) || {},
        data = null;
    if(ParamsUtils.isObjectId(userid)){
        data = await marksCtrl.markList(userid)
    }else{
        data = Serrors.paramsError('userid传参错误')
    }
    ctx.body = data
})

/**
 * 添加评论
 */
router.post('/addMark', async (ctx, next) =>{
    let {name,key,userid} = ParamsUtils.bodyValidate(ctx),
        res = null;

    if( !name || !key ){
        res = Serrors.paramsError('传参错误')
    }
    if(!res){
        res = await marksCtrl.addUpdateMark({name,key,userid,child:[]})
    }

    ctx.body = res
})

router.post('/updateMark', async (ctx, next) =>{
    let param = ParamsUtils.bodyValidate(ctx),
        res = null;

    let {_id,name,key,child} = param
    if(!ParamsUtils.isObjectId(_id) || !name || !key){
        res = Serrors.paramsError('传参错误')
    }
    if(child){
        param.child = JSON.parse(child)
    }
    if(!res){
       res = await marksCtrl.addUpdateMark(param,_id)
    }

    ctx.body = res
})


router.post('/deleteMark', async (ctx, next) =>{
    let {id} = ParamsUtils.bodyValidate(ctx),
        data = null;

    if(ParamsUtils.isObjectId(id)){
        data = marksCtrl.deleteMark(id)
    }else{
        data = Serrors.paramsError('id传参错误')
    }

    ctx.body = data
})





export default router;