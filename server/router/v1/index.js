import jwt from 'jsonwebtoken';

import Params from '../../utils/params'

import Router from 'koa-router'
import mark from './marks'
import plan from './plan'
import record from './record'
import user from './user'
const router = new Router({prefix: '/v1'})

/**
 * token登录验证
 */
// router.use(authorize)


router.use(mark.routes(), mark.allowedMethods())
router.use(plan.routes(), plan.allowedMethods())
router.use(record.routes(), record.allowedMethods())
router.use(user.routes(), user.allowedMethods())

function authorize (ctx, next) {
  // console.log( ctx )
  if (ctx.method === 'OPTIONS') {
    ctx.body = {}
    return
  }

  let params = null
  if (Params.tokenValidate(ctx)) {
    params = Params.tokenValidate(req, res)
  }else {
    ctx.body = {
      data: {},
      code: '208',
      msg: 'token不存在'
    }
    return
  }

  if (ctx.path === '/login') {
  }else {
    if (!params.token) {
      ctx.body = {
        data: {},
        code: '209',
        msg: 'token不存在'
      }
      return
    }

    let token = params.token
    let decoded = null

    try {
      decoded = jwt.verify(token, constant.secret)
    } catch(err) {
      ctx.body = {
        data: {},
        code: '210',
        msg: 'token 已过期'
      }
      return
    }
  }
  next()
}

export default router
