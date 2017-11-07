'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users',
      [{
      fullname  : 'Ahmad Shahab',
      address   : 'dwijaya2',
      phone     : '08983060304',
      email     : 'matt.syahab@gmail.com',
      username  : 'admin',
      password  : 'admin',
      privilege : '0'
      },
      {
      fullname  : 'Septian Fujianto',
      address   : 'pondokindah',
      phone     : '0811239129',
      email     : 'SeptianFuji@gmail.com',
      username  : 'septian',
      password  : 'septian',
      privilege : '1'
      }], {})
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', [
     {
        fullname :'Ahmad Shahab'
     },
     {
        fullname :'Septian Fujianto'
     }         
     ])    
  }
};
