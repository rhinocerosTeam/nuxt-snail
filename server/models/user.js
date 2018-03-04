/**
 * Created by songpeilan on 2018/3/3.
 */
import baseModel from './base-model';
import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    create_time: String
}, {versionKey: false});


userSchema.statics = _.merge(baseModel, {});

export default mongoose.model('user', userSchema, 'users');