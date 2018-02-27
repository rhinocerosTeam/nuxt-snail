/**
 * Created by user on 2018/2/11.
 */
/**
 * Created by songpeilan on 2018/2/8.
 */
import Model from '../models/index'
import Entity from '../service/entity'
import {exec} from 'child_process'
import mongoose from 'mongoose';
import Serrors from '../utils/serrors'
import _ from 'lodash'
import PlanCtrl from './plan'

export default class RecordControl {
    constructor() {
    }

    /**
     * 查询数据
     * @param  {String} userId  用户id
     * @return Promise
     * **/
    async recordList(condition) {
        let res = null,
            doc = null;

        doc = await Entity.fetch(Model.record, 'create_time',condition).catch(e => {
            res = Serrors.findError('查询失败')
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


    async refrecordList(condition){
        let res = null,
            doc = null;


        doc = await Entity.refFetchPage(Model.record, 0, 20,'create_time',condition).catch(e => {
            res = Serrors.findError('查询失败')
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


    async addUpdateRecord(data) {
        let res = null,
            doc = null;

        if (data._id) {
            doc = await Entity.update(Model.record,  data._id ,data).catch((e) => {
                res = Serrors.update('record更新失败')
            })
        } else {
            doc = await Entity.create(Model.record, data).catch(e => {
                res = Serrors.findError('record增加失败')
            })
            // 增加工时和完成程度
            await PlanCtrl.EditPlanByRecord()
            await Entity.updateBase(Model.plan, {'_id':data.planId},{$inc:{persent:data.persent}}).catch(e => {
                res = Serrors.findError('plan修改失败')
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
     * 删除record
     */
    async deleteRecord(id) {

        let res = null,
            doc = null;


        doc = await Entity.remove(Model.record, id).catch(e => {
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



}

export const recordCtrl = new RecordControl()