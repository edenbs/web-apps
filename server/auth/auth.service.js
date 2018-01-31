import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import pify from 'pify';
import User from '../api/user/user.model';
import createError from 'http-errors';
import _ from 'lodash';
import arrify from 'arrify';

const validateJwt = pify(expressJwt({secret: process.env.SESSION_SECRET}));

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 *
 * @returns {Function} middleware
 */
export function isAuthenticated () {
  return (req, res) => {
    return validateJwt(req, res)
      .then(() => {
        return User.findById(req.user._id);
      })
      .then(user => {
        if (!user) {
          return Promise.reject(createError(401));
        }

        req.user = user;
      });
  };
}

export function hasRole (role) {
  return (req, res) => {
    return isAuthenticated()(req, res)
      .then(() => {

          if(!_.includes(arrify(role), req.user.role)) {
            return Promise.reject(createError(403));
        }
      });
  };
}

/**
 * Returns a jwt token signed by the app secret
 *
 * @param {ObjectId} id the user id to keep in the jwt
 * @returns {String} signed jwt token
 */
export function signToken (id) {
  return jwt.sign({_id: id}, process.env.SESSION_SECRET, {expiresIn: '7d'});
}
