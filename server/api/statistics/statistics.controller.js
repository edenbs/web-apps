import _ from 'lodash';
import Student from '../student/student.model';

const errorIfEmpty = result => result || Promise.reject(createError(404));

export function avgGradeInClass(req) {
    return Student.aggregate([{
        $group: {
            _id: '$class',
            averageGrade: {$avg: '$avgGrade'}
        }
    }]).then(result => console.log(result));
}

export function numInClass(req) {
    return Student.aggregate([{
        $group: {
            _id: '$class',
            count: {$sum: 1}
        }
    }]).then(result => console.log(result));
}