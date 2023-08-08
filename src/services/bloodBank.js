/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const db = require('../models/index');

const { bloodBank } = db;

/* @Params:id,data
   @Description:This function creates bloodbank
*/
exports.bloodBankDetail = async (id, data) => {
  try {
    const bldBankData = await bloodBank.create(data);
    return bldBankData;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:UserId
   @Description:This function find bloodbank by id.
*/
exports.findId = async (UserId) => {
  try {
    const user = await bloodBank.findOne({ where: { UserId } });
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:data
  @Description:function to see list of blood banks
*/
exports.allBldBankData = async (data) => {
  try {
    const allData = await bloodBank.findAll({});
    return allData;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:username
   @Description:This function find bloodbank by name
*/
exports.findName = async (username) => {
  try {
    const user = await bloodBank.findOne({ where: { created_by: username } });
    return user;
  } catch (err) {
    console.log(err);
  }
};
