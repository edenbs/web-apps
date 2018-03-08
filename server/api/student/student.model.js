import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './student.seed';
import mongoosePaginate from 'mongoose-paginate';
import XRegExp from 'xregexp';
import Grade from '../grade/grade.model.js';
import _ from 'lodash';
import idvalidator from 'mongoose-id-validator';

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
        max: 100,
        default: 0
    },
    grades: [{type: Schema.Types.ObjectId, ref: 'Grade'}]
});

studentSchema.plugin(idvalidator);
studentSchema.plugin(mongoosePaginate);

studentSchema.pre('save', function(next) {
    var self = this;
    this.populate('grades').execPopulate().then(() =>{
        self.calcAvgGrade();
        next();
    })
    .catch(next);
});

studentSchema.methods.calcAvgGrade = function () {
    if (this.grades && this.grades.length) {
        this.avgGrade = _.meanBy(this.grades, grade => grade.score);
    } else {
        this.avgGrade = 0;
    }
};

studentSchema.methods.updateAvgGrade = function () {
    var self = this;
    return this.populate('grades').execPopulate().then(() => {
            self.calcAvgGrade();
            return self.save();
        })
};

export default createSeedModel('Student', studentSchema, seed);
