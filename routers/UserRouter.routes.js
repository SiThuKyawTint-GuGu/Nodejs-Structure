const express = require('express');
const router = express.Router();
const { createUser, getUser, loginUser } = require('../controllers/UserController');
const authMiddleware = require('../middlewares/middleware');
const { createUserValidator, validateCreateUser } = require('../validators/UserValidations/UserValidation.validators');
const createLimiter = require('../tests/api-limits/customApi-limit');

//Create Api Limit Time
const createUserLimiter = createLimiter(60, 60 * 60 * 1000);

router.post('/createUser', createUserValidator, validateCreateUser, createUserLimiter, createUser);
router.get('/getUser', authMiddleware, getUser);
router.post('/loginUser', authMiddleware, loginUser);

module.exports = router;
