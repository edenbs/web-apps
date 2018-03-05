import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './school.seed';

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
   name: {
       type: String,
       required: true,
       unique: true
   },
    location: {
        lat: Number,
        lng: Number
    }
});

export default createSeedModel('School', schoolSchema, seed);

