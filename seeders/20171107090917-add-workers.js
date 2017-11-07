'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Workers',
      [{
      fullname  : 'Roy Suryo',
      phone     : '0808313131',
      email     : 'suryo@gmail.com',
      averagerating : 5,
      createdAt : new Date(),
      updatedAt : new Date()      
      },
      {
      fullname  : 'Surya Rey',
      phone     : '0822112311',
      email     : 'rey@gmail.com',
      averagerating : 4,
      createdAt : new Date(),
      updatedAt : new Date()      
      }], {})
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Workers', [
     {
        fullname :'Roy Suryo'
     },
     {
        fullname :'Surya Rey'
     }         
     ])  
  }
};
