'use strict';
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('users', [{
      name:"superUser",
      username: "superUser11",
      password: await bcrypt.hash("superPass#123", 10),
      contact:"9999999999",
      address: "Mohali",
      state: "Punjab",
      city: "Mohali",
      email: "superUser11@gmail.com",
      role: "super_user",
      blood_group:"null",
      created_by:"superUser11",
      updated_by:"superUser11"  ,
      status:"active",
      createdAt: new Date(),
      updatedAt: new Date()
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
     await queryInterface.bulkDelete('users', null, {});
     
  }
};
