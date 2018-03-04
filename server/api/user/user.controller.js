import User from './user.model';
import Grade from '../grade/grade.model';
import createError from 'http-errors';
import _ from 'lodash';

export function me (req) {
    return Promise.resolve(req.user);
}

export function getMySubjects (req) {
    return Grade.find({teacher: req.user._id})
        .then(grades => {
            return _.slice(_.map(_.orderBy(_.groupBy(grades, grade => grade.subject), subject => subject.length, 'desc'), group => _.head(group).subject),
                0, req.query.limit);
        });
}