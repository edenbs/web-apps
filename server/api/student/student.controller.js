import Student from './student.model.js';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));
const errorIfNotSchool = (student, school) => student.school.equals(school) ? student : Promise.reject(createError(403));

export function index(req) {
    var query = {school: req.user.school};

    if (req.query.name) {
        req.query.name = JSON.parse(req.query.name);

        if (req.query.name.first) {
            query['name.first'] = {$regex: req.query.name.first, $options: 'i'};
        }

        if (req.query.name.last) {
            query['name.last'] = {$regex: req.query.name.last, $options: 'i'};
        }
    }

    if (req.query.class) {
        query['class'] = req.query.class;
    }

    return Student.paginate(query, req.query);
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
