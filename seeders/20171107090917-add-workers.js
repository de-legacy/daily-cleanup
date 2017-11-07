'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users',
      [{
      fullname  : 'Roy Suryo',
      phone     : '0808313131',
      email     : 'suryo@gmail.com',
      averagerating : 5
      },
      {
      fullname  : 'Surya Rey',
      phone     : '0822112311',
      email     : 'rey@gmail.com',
      averagerating : 4
      }], {})
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', [
     {
        fullname :'Roy Suryo'
     },
     {
        fullname :'Surya Rey'
     }         
     ])  
  }
};
