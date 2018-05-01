/**
 * Created by Cray on 2017/8/17.
 */
import _ from 'lodash'
import Model from '../models';

export const wraper = (model, params) => {

    if(model === Model.plan){
        params = _.pick(params, ['planName', 'startDatetime', 'endDatetime', 'manHour', 'markId', 'markKey', 'result'
            , 'percent','userid']);
        return Object.assign({}, {
            planName: "",
            startDatetime: "",
            endDatetime: "",
            manHour: 0,
            markId: "",
            markKey: "",
            result: 0,
            percent:0,
            userid:'',
            create_time: Date.now(),
            update_time:Date.now()
        }, params)
    }
    if(model === Model.record){
        params = _.pick(params, ['planId', 'content', 'type','start_time', 'end_time', 'persent', 'userid']);
        return Object.assign({}, {
            planId: "",
            content: "",
            type:'0',
            start_time: "",
            end_time: "",
            percent: 0,
            userid: '',
            create_time: Date.now(),
        }, params)
    }
    if(model === Model.user){
        params = _.pick(params, ['username', 'password']);
        return Object.assign({}, {
            username: "",
            password: "",
            create_time: Date.now(),
        }, params)
    }

    if(model === Model.mark){
        return params
    }


}