const express = require('express');
const router = express.Router();
const UserRouter = require('./UserRouter.routes');

router.use('/users', UserRouter);

module.exports = router;
