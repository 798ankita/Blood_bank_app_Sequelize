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
exports.findId = async (attribute) => {
  try {
    const user = await bloodBank.findOne({ where: attribute });
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

