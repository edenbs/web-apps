import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './user.seed'
import passportLocalMongoose from 'passport-local-mongoose';
import pify from 'pify';

const Schema = mongoose.Schema;
const roles = ['admin', 'manager', 'editor', 'viewer'];

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        first: String,
        last: String
    },
    role: {
        enum: roles,
        type: String,
        lowercase: true,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    }
});

userSchema
    .plugin(passportLocalMongoose, {
        usernameField: 'id'
    });

userSchema
    .virtual('name.full')
    .get(function () {
        return `${this.name.first} ${this.name.last}`;
    });

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
    });

userSchema.pre('save', function(next) {
   if (!this._password) {
       return next();
   }

    this.setPassword(this._password, () => {
        next();
    });
});

// Use promises instead of callbacks
userSchema.methods.setPassword = pify(userSchema.methods.setPassword);
userSchema.methods.changePassword = pify(userSchema.methods.changePassword);
userSchema.methods.authenticate = pify(userSchema.methods.authenticate);

export default createSeedModel('User', userSchema, seed);