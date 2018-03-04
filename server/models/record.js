/**
 * Created by songpeilan on 2018/2/8.
 */
import baseModel from './base-model';
import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const recordSchema = new Schema({
    planId: {type: Schema.Types.ObjectId, ref: 'plan'},
    content: String,
    start_time: String,
    end_time: String,
    create_time: String,
    userid: String, // userid
    persent: Number
}, {versionKey: false});


recordSchema.statics = _.merge(baseModel, {
    refFetchPage: function (skip, limit, cb, sortType = 'create_time', conditions = {}) {
        return this
            .find(conditions)
            .populate('planId')
            .skip(skip)
            .limit(limit)
            .sort({[sortType]: 'desc'})
            .exec(cb);
    }
});

export default mongoose.model('record', recordSchema, 'records');