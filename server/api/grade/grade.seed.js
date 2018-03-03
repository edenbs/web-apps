import User from '../user/user.model.js';

export default {
    dependencies: [User],
    seed: (users) => [{
        subject: 'אזרחות',
        score: 100,
        teacher: users[2]
    }, {
        subject: 'מדעים',
        score: 90,
        teacher: users[2]
    }, {
        subject: 'מדעים',
        score: 90,
        teacher: users[2]
    }, {
        subject: 'מדעים',
        score: 90,
        teacher: users[2]
    }, {
        subject: 'מדעים',
        score: 90,
        teacher: users[2]
    }, {
        subject: 'מדעים',
        score: 90,
        teacher: users[2]
    }, {
        subject: 'מדעים',
        score: 90,
        teacher: users[2]
    }, {
        subject: 'מדעים',
        score: 90,
        teacher: users[2]
    }, {
        subject: 'מדעים',
        score: 90,
        teacher: users[2]
    }]
}
