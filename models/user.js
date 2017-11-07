'use strict';
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
              return next("Email Already Register")
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
    
  return User;
};