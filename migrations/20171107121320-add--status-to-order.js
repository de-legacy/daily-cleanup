'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.addColumn('Orders' , 'status', Sequelize.BOOLEAN)    
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn('Orders', 'status');
  }
};
