import User from './user.model';
import createError from 'http-errors';

export function me (req) {
    return Promise.resolve(req.user);
}