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
      privelege : 0,
      createdAt : new Date(),
      updatedAt : new Date()
      },
      {
      fullname  : 'Septian Fujianto',
      address   : 'pondokindah',
      phone     : '0811239129',
      email     : 'SeptianFuji@gmail.com',
      username  : 'septian',
      password  : 'septian',
      privelege : 1,
      createdAt : new Date(),
      updatedAt : new Date()      
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
