import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './grade.seed';
import idvalidator from 'mongoose-id-validator';

const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        min: 0,
        max: 100
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

gradeSchema.plugin(idvalidator);

export default createSeedModel('Grade', gradeSchema, seed);
