import User from '../user/user.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));
const errorIfNotTeacher = user => _.includes(['viewer', 'editor'], user.role) ? Promise.resolve(user) : Promise.reject(createError(400));
const errorIfNotSchool = (user, school) => user.school.equals(school) ? user : Promise.reject(createError(403));

// Get list of teachers of the school
export function index(req) {
    return User.find({
        school: req.user.school,
        role: { $in: ['editor', 'viewer'] }
    });
}

// Create new user
export function create (req) {
    const data = _.pick(req.body, ['id', 'name', 'role']);

    data.school = req.user.school;

    return errorIfNotTeacher(new User(data))
        .then(user => user.save())
        .then(errorIfEmpty)
        .then(_.noop);
}

export function update (req) {
    const data = _.pick(req.body, ['role']);

    return User.findById(req.params.id)
        .then(errorIfEmpty)
        .then(errorIfNotTeacher)
        .then(user => errorIfNotSchool(user, req.user.school))
        .then(user => user.set(data).save())
        .then(_.noop);
}

export function remove (req) {
    return User.findById(req.params.id)
        .then(errorIfEmpty)
        .then(errorIfNotTeacher)
        .then(user => errorIfNotSchool(user, req.user.school))
        .then(user => user.remove())
        .then(_.noop);
}
