/**
 * Created by user on 2018/2/5.
 */
import baseModel from './base-model';
import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const markSchema = new Schema({
    key: String, // key
    name: String, // 标签名称
    userid: String, // userid
    child: [] // 子标签
}, {versionKey: false});


markSchema.statics = _.merge(baseModel, {});

export default mongoose.model('mark', markSchema, 'marks');