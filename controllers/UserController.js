const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Token = require('../models/Token');
const generateToken = require('../services/GenerateToken');
const {handle500Error, handle400Error } = require('../utils/errors/error.message');
const handleSuccess = require('../utils/success/success.message');
const hashPassword = require('../services/GenerateHashpassword'); 

const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ name, email, password: hashedPassword ,phone});
        const tokenValue = generateToken({ userId: user.id, email: user.email });

        const token = await Token.create({
            token: tokenValue,
            expires_at: new Date(Date.now() + 3600000),
            user_id: user.id,
        });
        handleSuccess(res, { user, token });
    } catch (error) {
        handle500Error(res, error, 'Failed to create user');
    }
};

const getUser = async (req, res) => {
    try {
        const authenticatedUserId = req.user.id;
        const user = await User.findByPk(authenticatedUserId);

        if (!user) {
            return handle400Error({ error: 'User not found' })
        }
        res.status(200).json({ user });
    } catch (error) {
        handle500Error(res, error, 'Failed to get user');;
    }
};

const loginUser = async (req, res) => {
    try {
        const authenticatedUserId = req.user.id;
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return handle400Error({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return handle400Error({ error: 'Invalid password' });
        }
        const tokenValue = generateToken({ userId: user.id, email: user.email });
        const token = await Token.create({
            token: tokenValue,
            expires_at: new Date(Date.now() + 3600000),
            user_id: user.id,
        });

        handleSuccess(res, { user, token });
    } catch (error) {
        handle500Error(res, error, 'Login failed');
    }
};


module.exports = {
    createUser,
    getUser,
    loginUser
};
