const db = require("../models/index");
const {success,error} = require("../utils/user_utils")
const bloodBank = db.bloodBank;

/* @Params:id,data
   @Description:This function creates bloodbank 
*/
exports.bloodBankDetail= async (id,data) => {
    try { 
      const bldBankData = await bloodBank.create(data);
      return bldBankData;
      } catch (err) {
      console.log(err);
    }
  };

  /* @Params:id,data
   @Description:This function find bloodbank by id.
*/
exports.findId = async (UserId) => {
  try {
    const user = await bloodBank.findOne({ where: {UserId:UserId } });
    return user;
  } 
  catch (err) {
  throw err;
  }
};
  
/*@Params:data
  @Description:function to see list of blood banks
*/
exports.allBldBankData = async (data) => {
  try {
    const allData = await bloodBank.findAll({});
    return allData;
  } catch (err) {
    throw err;
  }
};

/* @Params:id,data
   @Description:This function find bloodbank by name 
*/
exports.findName= async (name) => {
  try {
    const user = await bloodBank.findOne({ where: {name:name } });
    return user;
  } 
  catch (err) {
  throw err;
  }
};