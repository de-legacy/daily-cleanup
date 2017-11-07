'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    UserId: DataTypes.INTEGER,
    WorkerId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    message: DataTypes.STRING
  });
    Order.belongsTo(models.User);
    Order.belongsTo(models.Worker);  
  return Order;
};