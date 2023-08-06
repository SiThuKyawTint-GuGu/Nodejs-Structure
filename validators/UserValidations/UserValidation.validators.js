
const { body, validationResult } = require('express-validator');

const createUserValidator = [
    body('name').notEmpty().withMessage('Nanme is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required'),
];

const validateCreateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createUserValidator,
    validateCreateUser,
};
