const { DataTypes } = require('sequelize');
const sequelize = require('../configs/config');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique:true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = User;
