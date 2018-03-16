import api from '~/api';
import {WX_HOST} from '~/api/config';
import _ from 'lodash'
export default function (ctx) {
    // console.log(process.server)
    if (process.server) {
        if (ctx.req.session && ctx.req.session.user) {
            ctx.store.commit('UPDATE_ACCOUNT', ctx.req.session.user)
        } else {
            ctx.store.commit('UPDATE_ACCOUNT', null)
        }
    } else {
        console.log('client render')
        // if (ctx.store.state.isLogin) {
        //     if (ctx.path == '/login') {
        //         ctx.$router.push({ path: '/' })
        //     }
        // }
    }

}