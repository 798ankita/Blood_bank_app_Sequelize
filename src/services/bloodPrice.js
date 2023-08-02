const db = require("../models/index");
const bloodPrice = db.bloodPrice;
/* @Params:data
   @Description:This function adding blood price details.
*/
exports.addBloodPrice = async (data) => {
    try {
      const detail = await bloodPrice.create(data);
      return detail;
    } 
    catch (err) {
    throw err;
    }
  };

/*@Params:bloodBankId
  @Description:This function find existing bloodbank id in blood price table.
*/
exports.findId = async(bloodBankId) => {
    try {
      const data = await bloodPrice.findOne({ where: {bloodBankId:bloodBankId} });
      return data;
    } 
  
    catch (err) {
    throw err;
    }
  };

  /*@Params:id,data
  @Description:function to update blood price details.
  */
exports.updatePriceDetails = async (bloodBankId,data) => {
    try {
      const detail = await bloodPrice.update(data,{
        where:{
            bloodBankId:bloodBankId 
        }    
    });
      return detail;
    } 
     catch (err) {
     throw err;
     }
  };
    