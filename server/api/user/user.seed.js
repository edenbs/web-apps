import School from '../school/school.model.js';

export default {
    dependencies: [School],
    seed: schools => [{
        id: 'admin',
        password: '123123123',
        name: {
            first: 'admin'
        },
        role: 'admin'
    }, {
        id: 'manager0',
        name: {
            first: 'Shula',
            last: 'Cohen'
        },
        role: 'manager',
        school: schools[0]
    },{
        id: 'editor0',
        name: {
            first: 'Merav',
            last: 'Sasson'
        },
        role: 'editor',
        school: schools[0]
    }, {
        id: 'viewer0',
        name: {
            first: 'Sara',
            last: 'Levi'
        },
        role: 'viewer',
        school: schools[0]
    }, {
        id: 'manager1',
        name: {
            first: 'Smadar',
            last: 'Schultz'
        },
        role: 'manager',
        school: schools[1]
    },{
        id: 'editor1',
        name: {
            first: 'Eti',
            last: 'Raul'
        },
        role: 'editor',
        school: schools[1]
    }, {
        id: 'viewer1',
        name: {
            first: 'Clara',
            last: 'Amsalem'
        },
        role: 'viewer',
        school: schools[1]
    }]
}