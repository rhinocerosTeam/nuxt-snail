/**
 * Created by songpeilan on 2018/2/8.
 */
/**
 * Created by user on 2018/2/5.
 */

import Model from '../models/index'
import Entity from '../service/entity'
import { exec } from 'child_process'
import mongoose from 'mongoose';
import Serrors from '../utils/serrors'
import _ from 'lodash'

export default class PlanControl {
    constructor() {}

    /**
     * 查询数据
     * @param  {String} userId  用户id
     * @return Promise
     * **/
    async planList(condition){
        let res=null,
            doc=null;

        // doc = await Entity.aggregate(Model.plan,[
        //     {
        //        $lookup:
        //        {
        //            from: "marks",
        //            localField: "markId",
        //            foreignField: "_id",
        //            as: "marks"
        //         }
        //     }
        // ])

        doc = await Entity.find(Model.plan,condition).catch(e => {
            res = Serrors.findError('计划查询失败')
        })
        if(!res){
            res = {
                code:200,
                data:doc,
                msg:''
            }
        }

        return new Promise((resolve) => {
            resolve(res)
        })

    }


    async addUpdatePlan(data,id){
        let res = null,
            doc = null;

        if(id){
            doc = await Entity.update(Model.plan,data,id).catch((e)=>{
                res = Serrors.update('plan更新失败')
            })
        }else{
            doc = await Entity.create(Model.plan, data).catch(e => {
                res = Serrors.findError('plan增加失败')
            })
        }


        if(!res){
            res = {
                code:200,
                data:doc,
                msg:''
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



}

export const planCtrl = new PlanControl()