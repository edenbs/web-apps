import User from '../user/user.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));
const errorIfNotManager = user => user.role != 'manager' ? user : Promise.reject(createError(400));

// Get list of managers
export function index() {
    return User.find({
        role: 'manager'
    });
}

// Get a single user
export function find (req) {
    return User.findById(req.params.id)
        .then(errorIfEmpty);
}

// Create new user with manager role
export function create (req) {
    const data = req.body;

    return errorIfNotManager(new User(data))
        .then(user => user.save())
        .then(errorIfEmpty)
        .then(user => {
            return {
                token: ''
            };
        });
}

// Update an existing user in DB
export function update (req) {
    const data = _.pick(req.body, ['name', 'school']);

    return User.findById(req.params.id)
        .then(errorIfEmpty)
        .then(errorIfNotManager)
        .then(user => user.set(data).save())
        .then(_.noop);
}

// Delete a user
export function remove (req) {
    return User.findOneAndRemove({_id: req.params.id})
        .then(errorIfEmpty)
        .then(_.noop);
}


