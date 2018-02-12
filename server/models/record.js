/**
 * Created by songpeilan on 2018/2/8.
 */
import baseModel from './base-model';
import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const recordSchema = new Schema({
    planId:{type:Schema.Types.ObjectId},
    content:String,
    start_time:String,
    end_time:String,
    create_time:String,
    persent:Number
}, { versionKey: false });


recordSchema.statics = _.merge(baseModel, {});

export default mongoose.model('record', recordSchema, 'records');