const db = require("../models/index");
const bloodInventory = db.bloodInventory;

/* @Params:data
   @Description:This function adding details to blood Inventory table.
*/
exports.addInventory = async (data) => {
    try {
      const detail = await bloodInventory.create(data);
      return detail;
    } 
    catch (err) {
    throw err;
    }
  };

  /*@Params:id
  @Description:This function find existing user's id
*/
exports.findId = async(id) => {
    try {
      const data = await bloodInventory.findOne({ where: {id:id} });
      return data;
    } 
  
    catch (err) {
    throw err;
    }
  };
  
/*@Params:id
  @Description:This function to check blood availability
*/
exports.findBlood = async(bloodGroup) => {
    try {
      const data = await bloodInventory.findOne({bloodGroup:bloodGroup});
      return data;
    } 
    catch (err) {
    throw err;
    }
  };
  
  