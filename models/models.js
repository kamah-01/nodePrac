
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');


const User = sequelize.define('User', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
   },

   name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notEmpty: true,
      },
   },

   email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
         isEmail: true,
      },
   },
   
   password: {
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: {
        len: [8, 128], 
    },
   },

}, {
   timestamps: true,
   tableName: 'users',

   })
   User.beforeCreate(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);

});

module.exports = { User };