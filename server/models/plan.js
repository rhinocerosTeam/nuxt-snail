/**
 * Created by songpeilan on 2018/2/8.
 */
/**
 * Created by user on 2018/2/5.
 */
import baseModel from './base-model';
import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const planSchema = new Schema({
    //_id:{type:Schema.Types.ObjectId},
    planName: String,
    startDatetime: String,
    endDatetime: String,
    manHour: Number,
    markId: {type: Schema.Types.ObjectId},
    markKey: String,
    result: String,
    percent: Number
}, {versionKey: false});


planSchema.statics = _.merge(baseModel, {});

export default mongoose.model('plan', planSchema, 'plans');