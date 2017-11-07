'use strict';
module.exports = (sequelize, DataTypes) => {
  var Worker = sequelize.define('Worker', {
    fullname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : true,
        isUnique : function(value,next){
          if(this.dataValues.id != null || this.dataValues.id != ''){
            next();
          }
          Worker.findAll({
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
    averagerating: DataTypes.FLOAT
  });
  Worker.associate = function(models){
    Worker.belongsToMany(models.User, {through : "Order"})
    Worker.hasMany(models.Order);
  }
  return Worker;
};