import School from './school.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));

export function index() {
    return School.find({});
}

export function create (req) {
    return new School(req.body).save()
        .then(errorIfEmpty);
}

export function remove(req) {
    return User.findOneAndRemove({_id: req.params.id})
        .then(errorIfEmpty)
        .then(_.noop);
}