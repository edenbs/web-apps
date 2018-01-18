import User from '../user/user.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));
const errorIfNotTeacher = user => _.includes(['viewer', 'editor'], user.role) ? user : Promise.reject(createError(400));

// Get list of teachers of the school
export function index() {
    return User.find({
        role: { $in: ['editor', 'viewer'] }
    });
}

// Get a single user
export function find (req) {
    return User.findById(req.params.id)
        .then(errorIfEmpty);
}

// Create new user
export function create (req) {
    const data = req.body;

    return errorIfNotTeacher(new User(data))
        .then(user => user.save())
        .then(errorIfEmpty)
        .then(user => {
            return {
                token: ''
            };
        });
}

export function update (req) {
    const data = _.pick(req.body, ['name', 'role']);

    return User.findById(req.params.id)
        .then(errorIfEmpty)
        .then(errorIfNotTeacher)
        .then(user => user.set(data).save())
        .then(_.noop);
}

export function remove (req) {
    return User.findOneAndRemove({_id: req.params.id})
        .then(errorIfEmpty)
        .then(_.noop);
}
