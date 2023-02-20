const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');


const Cheese = sequelize.define('Cheese', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Associate the Cheese model with the Board model
Cheese.belongsToMany(Board, { through: 'BoardCheese' }); // a cheese can be on many boards
