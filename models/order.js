'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },    
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