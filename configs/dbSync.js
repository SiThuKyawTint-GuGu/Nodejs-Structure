// dbSync.js
const sequelize = require('./config');
const Customer = require('../models/Customer');
const User = require('../models/User');
const Token = require('../models/Token');

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');
        await Customer.sync({ alter: true });
        await User.sync({ alter: true });
        await Token.sync({ alter: true });


        console.log('Customer and User tables synced successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = syncDatabase;
