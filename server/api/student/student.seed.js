import School from '../school/school.model.js';
import User from '../user/user.model.js';
import Grade from '../grade/grade.model.js';
import _ from 'lodash';

export default {
    dependencies: [School, User, Grade],
    seed: (schools, users, grades) => [{
        id: '313562894',
        name: {
            first: 'Eden',
            last: 'Bens'
        },
        class: 'ט-1',
        school: schools[0],
        gender: 'female',
        grades: _.times(9).map(i => grades[i])
    }, {
        id: '204773584',
        name: {
            first: 'Dana',
            last: 'Tsirulnik'
        },
        class: 'יא-2',
        school: schools[0],
        gender: 'female',
        grade: []
    },{
        id: '205634645',
        name: {
            first: 'Noy',
            last: 'Y'
        },
        class: 'י-1',
        school: schools[0],
        gender: 'female',
        grades: []
    }, {
        id: '123456789',
        name: {
            first: 'Cristiano',
            last: 'Ronaldo'
        },
        class: 'ט-1',
        school: schools[0],
        gender: 'male',
        grades: []
    }]
}
