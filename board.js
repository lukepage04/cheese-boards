const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Board = sequelize.define('Board', {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER, // should be INTEGER not INT
        allowNull: false 
    }
});

// Associate the Board model with the User model
Board.belongsTo(User); // a board belongs to a user
