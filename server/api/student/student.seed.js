import School from '../school/school.model.js';

export default {
    dependencies: [School],
    seed: (schools) => [{
        id: '313562894',
        name: {
            first: 'Eden',
            last: 'Bens'
        },
        class: 'ט-1',
        school: schools[0],
        gender: 'female',
        avgGrade: 100
    }, {
        id: '204773584',
        name: {
            first: 'Dana',
            last: 'Tsirulnik'
        },
        class: 'יא-2',
        school: schools[0],
        gender: 'female',
        avgGrade: 100
    },{
        id: '205634645',
        name: {
            first: 'Noy',
            last: 'Y'
        },
        class: 'י-1',
        school: schools[0],
        gender: 'female',
        avgGrade: 100
    }, {
        id: '123456789',
        name: {
            first: 'Cristiano',
            last: 'Ronaldo'
        },
        class: 'ט-1',
        school: schools[0],
        gender: 'male',
        avgGrade: 85
    }]
}
