import bcrypt from 'bcrypt'
import User from "../models/User.js";
import jwt from 'jsonwebtoken'


const generateAccessToken = async(user_id) => {
    return jwt.sign({ userId: user_id} , process.env.JWT_SECRET_KEY , { expiresIn: '1m' });
}

const generateRefreshToken = async(user_id) => {
    return jwt.sign({ userId: user_id}, process.env.JWT_REFRESH_KEY, { expiresIn: '10d' });
}

export {
    generateAccessToken,
    generateRefreshToken
}