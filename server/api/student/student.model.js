import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './student.seed';
import mongoosePaginate from 'mongoose-paginate';
import XRegExp from 'xregexp';

const Schema = mongoose.Schema;

const genders = ['male', 'female'];

const studentSchema = new Schema({
    id: {
       type: String,
       required: true,
       unique: true
    },
    name: {
        first: String,
        last: String
    },
    class: {
        type: String,
        validate: {
            validator: function(v) {
                return new XRegExp('^(\\p{L}{1,2}-[1-9][0-9]?)$').test(v)
            },
            message: '{VALUE} is not a valid class'
        }
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    gender: {
        enum: genders,
        type: String,
        lowercase: true,
        required: true
    },
    avgGrade: {
        type: Number,
        min: 0,
        max: 100
    }
});

studentSchema.plugin(mongoosePaginate);

export default createSeedModel('Student', studentSchema, seed);
