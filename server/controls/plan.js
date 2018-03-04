/**
 * Created by songpeilan on 2018/2/8.
 */
/**
 * Created by user on 2018/2/5.
 */

import Model from '../models/index'
import Entity from '../service/entity'
import {exec} from 'child_process'
import mongoose from 'mongoose';
import Serrors from '../utils/serrors'
import _ from 'lodash'

export default class PlanControl {
    constructor() {
    }

    /**
     * 查询数据
     * @param  {String} userId  用户id
     * @return Promise
     * **/
    async planList(condition, type) {
        let res = null,
            doc = null;


        if (type == 2) { // 正在进行
            condition.startDatetime = {$lte: Date.now()}
            condition.result = 0
        } else if (type == 3) { //没开始
            condition.startDatetime = {$gt: Date.now()}
        } else if (type == 4) { //完成
            condition.result = 1
        } else {

        }


        doc = await Entity.find(Model.plan, condition).catch(e => {
            res = Serrors.findError('计划查询失败')
        })
        if (!res) {
            res = {
                code: 200,
                data: doc,
                msg: ''
            }
        }

        return new Promise((resolve) => {
            resolve(res)
        })

    }


    async addUpdatePlan(data) {
        let res = null,
            doc = null;

        if (data._id) {
            doc = await Entity.update(Model.plan, data._id, data).catch((e) => {
                res = Serrors.update('plan更新失败')
            })
        } else {
            doc = await Entity.create(Model.plan, data).catch(e => {
                res = Serrors.findError('plan增加失败')
            })
        }


        if (!res) {
            res = {
                code: 200,
                data: doc,
                msg: ''
            }
        }

        return new Promise((resolve) => {
            resolve(res)
        })


    }


    /**
     * 删除plan
     */
    async deletePlan(id) {

        let res = null,
            doc = null;

        doc = await Entity.remove(Model.plan, id).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'delete error'
            }
        })

        if (!res) {
            res = {
                code: 200,
                data: doc,
                msg: 'del success'
            }
        }

        return new Promise((resolve) => {
            resolve(res);
        })
    }

    /* 根据工时和完成百分比修改计划 */
    async EditPlanByRecord(params) {
        let {planId, manHour, percent} = params
        await Entity.updateBase(Model.plan,{_id:planId},{$inc:{manHour:manHour,percent:percent}},{multi: true}).catch(e=>{
           return false
        })
        return true
    }


}

export const planCtrl = new PlanControl()