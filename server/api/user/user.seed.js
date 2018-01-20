import School from '../school/school.model.js';

export default {
    dependencies: [School],
    seed: schools => [{
        id: 'admin',
        password: '123',
        name: {
            first: 'admin',
            last: 'admin'
        },
        role: 'admin'
    }, {
        id: 'manager0',
        password: '123',
        name: {
            first: 'Shula',
            last: 'Cohen'
        },
        role: 'manager',
        school: schools[0]
    },{
        id: 'editor0',
        password: '123',
        name: {
            first: 'Merav',
            last: 'Sasson'
        },
        role: 'editor',
        school: schools[0]
    }, {
        id: 'viewer0',
        password: '123',
        name: {
            first: 'Sara',
            last: 'Levi'
        },
        role: 'viewer',
        school: schools[0]
    }, {
        id: 'manager1',
        password: '123',
        name: {
            first: 'Smadar',
            last: 'Schultz'
        },
        role: 'manager',
        school: schools[1]
    },{
        id: 'editor1',
        password: '123',
        name: {
            first: 'Eti',
            last: 'Raul'
        },
        role: 'editor',
        school: schools[1]
    }, {
        id: 'viewer1',
        password: '123',
        name: {
            first: 'Clara',
            last: 'Amsalem'
        },
        role: 'viewer',
        school: schools[1]
    }]
}