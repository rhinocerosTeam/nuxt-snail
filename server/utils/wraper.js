/**
 * Created by Cray on 2017/8/17.
 */
import _ from 'lodash'
import Model from '../models';

export const wraper = (model, params) => {

    if(model === Model.plan){
        params = _.pick(params, ['planName', 'startDatetime', 'endDatetime', 'manHour', 'markId', 'markKey', 'result'
            , 'percent']);
        return Object.assign({}, {
            planName: "",
            startDatetime: "",
            endDatetime: "",
            manHour: 0,
            markId: "",
            markKey: "",
            result: 0,
            percent:0,
            create_time: Date.now(),
            update_time:Date.now()
        }, params)
    }
    if(model === Model.record){
        params = _.pick(params, ['planId', 'content', 'start_time', 'end_time',  'persent']);
        return Object.assign({}, {
            planId: "",
            content: "",
            start_time: "",
            end_time: "",
            percent: 0,
            create_time: Date.now(),
        }, params)
    }

}