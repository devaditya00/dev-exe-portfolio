import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const generateAccessToken = (userId) => {
    return jwt.sign({id: userId}, ENV.jwtSecret, {expiresIn: ENV.jwtExpire,
    });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({id: userId}, ENV.jwtRefreshSecret,{
      expiresIn: ENV.jwtRefreshExpire,
    });
};