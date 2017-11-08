'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    UserId: DataTypes.INTEGER,
    WorkerId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    message: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  });

  Order.associate = function(models){
    Order.belongsTo(models.Worker);
    Order.belongsTo(models.User);
  }   
  
  return Order;
};