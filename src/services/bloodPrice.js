/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const db = require('../models/index');

const { bloodPrice } = db;
/* @Params:data
   @Description:This function adding blood price details.
*/
exports.addBloodPrice = async (data) => {
  try {
    const detail = await bloodPrice.create(data);
    return detail;
  } catch (err) {
    throw(err);
  }
};

/* @Params:bloodBankId
  @Description:This function find existing bloodbank id in blood price table.
*/
exports.findId = async (attribute) => {
  try {
    const data = await bloodPrice.findOne({ where: attribute });
    return data;
  } catch (err) {
    throw(err);
  }
};

/* @Params:bloodBankId,data
  @Description:function to update blood price details.
  */
exports.updatePriceDetails = async (bloodBankId, data) => {
  try {
    const detail = await bloodPrice.update(data, {
      where: {
        bloodBankId,
      },
    });
    return detail;
  } catch (err) {
    throw(err);
  }
};
