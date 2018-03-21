/**
 * Created by user on 2018/2/5.
 */

import Model from '../models/index'
import Entity from '../service/entity'
import {exec} from 'child_process'
import mongoose from 'mongoose';
import Serrors from '../utils/serrors'
import _ from 'lodash'

export default class MarksControl {
    constructor() {
    }

    /**
     * 查询marks数据
     * @param  {String} userId  用户id
     * @return Promise
     * **/
    async markList(userid) {
        let res = null,
            doc = null;
        doc = await Entity.find(Model.mark, {userid: userid}).catch(e => {
            res = Serrors.findError('标签mark查询失败')
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


    async addUpdateMark(data, id) {
        let res = null,
            doc = null;

        if (id) {
            delete data._id
            console.log('addUpdateMark-->', data, id)
            doc = await Entity.update(Model.mark, id, data).catch((e)=> {
                res = Serrors.updateError('标签mark更新失败')
            })
        } else {

            console.log('data-->', data)

            doc = await Entity.create(Model.mark, data).catch(e => {
                res = Serrors.findError('标签增加失败')
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
     * 删除book
     */
    async deleteMark(id) {

        let res = null,
            doc = null;


        doc = await Entity.remove(Model.mark, id).catch(e => {
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

export const marksCtrl = new MarksControl()