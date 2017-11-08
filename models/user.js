'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : true,
        isUnique : function(value,next){
          if(this.dataValues.id != null || this.dataValues.id != ''){
            next();
          }
          User.findAll({
            where : {email : value}
          })
          .then(foundEmail => {
            if(foundEmail.length > 0 ){
              return next("Email Already Registered")
            }else{
              next();
            }
          })
        }
      }
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    privelege: DataTypes.INTEGER
  });

  User.associate = function(models){
    User.belongsToMany(models.Worker, {through : 'Order'})
    User.hasMany(models.Order);
  }

  User.beforeUpdate((user, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = user.password;
    return  bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
      user.password = hash
    });
  });  

  User.beforeCreate((user, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = user.password;
    return  bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
      user.password = hash
    });
  });  
  
  return User;
};