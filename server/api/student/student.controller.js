import Student from './student.model.js';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));
const errorIfNotSchool = (student, school) => student.school.equals(school) ? student : Promise.reject(createError(403));

export function index(req) {
    return Student.paginate({school: req.user.school}, req.query);
}

export function create (req) {
    const data = _.pick(req.body, ['id', 'name', 'class', 'gender', 'avgGrade']);

    data.school = req.user.school;

    return new Student(data).save()
        .then(errorIfEmpty)
        .then(_.noop);
}

export function update(req) {
    var data = _.pick(req.body, ['name', 'class', 'gender', 'avgGrade']);

    return Student.findById(req.params.id)
        .then(errorIfEmpty)
        .then(student => errorIfNotSchool(student, req.user.school))
        .then(student => student.set(data).save())
        .then(_.noop);
}

export function remove (req) {
    return Student.findById(req.params.id)
        .then(errorIfEmpty)
        .then(student => errorIfNotSchool(student, req.user.school))
        .then(student => student.remove())
        .then(_.noop);
}
