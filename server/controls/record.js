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
import {planCtrl}  from './plan'

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

        doc = await Entity.fetchBase(Model.record, {'recordType': 'desc', 'create_time': 'desc'}, condition).catch(e => {
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


    async refrecordList(condition) {
        let res = null,
            doc = null;


        doc = await Entity.refFetchBasePage(Model.record, 0, 20, {'recordType': 'desc', 'create_time': 'desc'}, condition).catch(e => {
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
            doc = null,
            _persent = 0,
            _manHour = 0;

        console.log('data-->',data)

        if (data._id) {
            let record = await Entity.findById(Model.record, data._id).catch((e) => {
                res = Serrors.findError('record查询失败')
            })
            doc = await Entity.update(Model.record, data._id, data).catch((e) => {
                res = Serrors.updateError('record更新失败')
            })
            _manHour = (Number(data.end_time) - Number(data.start_time)) - (Number(record.end_time) - Number(record.start_time))
            _persent = Number(data.persent) - Number(record.persent)
        } else {
            doc = await Entity.create(Model.record, data).catch(e => {
                res = Serrors.createError('record增加失败')
            })
            _persent = data.persent
            _manHour = data.end_time - data.start_time
        }

        // 增加工时和完成程度
        await planCtrl.EditPlanByRecord({planId: data.planId, percent: _persent, manHour: _manHour}).catch(e => {
            res = Serrors.findError('plan修改失败')
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


    /**
     * 删除record
     */
    async deleteRecord(id) {

        let res = null,
            doc = null,
            _persent = 0,
            _manHour = 0;

        let record = await Entity.findById(Model.record, id).catch((e) => {
            res = Serrors.findError('record查询失败')
        })

        _persent = -record.persent
        _manHour = -(record.end_time - record.start_time )

        doc = await Entity.remove(Model.record, id).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'delete error'
            }
        })

        console.log({id, record, planId: record.planId, percent: _persent, manHour: _manHour})

        // 删除工时和完成程度
        await planCtrl.EditPlanByRecord({planId: record.planId, percent: _persent, manHour: _manHour}).catch(e => {
            res = Serrors.updateError('plan修改失败')
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