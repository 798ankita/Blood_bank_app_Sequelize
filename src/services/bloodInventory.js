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

  /*@Params:bloodBankId
  @Description:This function find existing user's id
*/
exports.findId = async(bloodBankId) => {
    try {
      const data = await bloodInventory.findOne({ where: {bloodBankId:bloodBankId} });
      return data;
    } 
  
    catch (err) {
    throw err;
    }
  };
  
/*@Params:id
  @Description:This function to check blood availability
*/
exports.findInventory= async(id) => {
    try {
      const data = await bloodInventory.findOne({where:{id:id}});
      return data;
    } 
    catch (err) {
  throw err;
    }
  };
  
  /*@Params:id,data
  @Description:function to update blood Inventory units.
  */
exports.updateInventory = async (id,data) => {
  try {
    const detail = await bloodInventory.update(data,{
      where:{
        id:id 
      }    
  });
    return detail;
  } 
   catch (err) {
   throw err;
   }
};
  
  /*@Params:id, blood, unit
  @Description:function to update blood Inventory units automaticaly.
  */
  exports.updateAutoInventory = async(bloodId, data)=>{
    try {
      const change = await bloodInventory.update(
        data,
        {
          where:{
            bloodBankId:bloodId
          }
        }
      )
      return change;
    } catch (err) {
      console.log(err);
    }
   
  };



