const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('nkqtblfo','nkqtblfo','EMNVpbiUc7oFhR3UD6ltoVtlL_7dP7Xn',{
  host: 'drona.db.elephantsql.com',
  dialect: 'postgres',
  port: 5432,
});

const Recipe = sequelize.define('Recipe',{
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    ingredients:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    instructions:{
        type:DataTypes.TEXT,
        allowNull:false,
    }
})

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });

module.exports = {sequelize,Recipe};

