const bloodBankService = require("../services/bloodBank");
const userService = require("../services/user_service");
const { success, error } = require("../utils/user_utils");
const data = require("../middleware/userMiddleware");

//controller for adding blood bank detail
 exports.bldBankDetails = async(req,res) => {
 try {
const userId = req.data;
const userToken = await userService.userId(userId);
const findId = await bloodBankService.findId(userId);
if(userToken.role == "blood_bank" && userToken.status == "active" && findId == null)
  {
   const details =await bloodBankService.bloodBankDetail(userToken.id,{
   name:req.body.name,
   logo:req.body.logo,	
   address:req.body.address,
   description:req.body.description,
   status:"active",
   created_by:req.body.name,
   updated_by:userToken.username,
   UserId:userToken.id
   
});
return success(res,details, "blood bank added successfully", 200);
}
return error(res,"Permission denied","do not have permission to add blood bank or blood bank already added by you!",403)
    
 } catch (err) {
   console.log(err);
   return error(res,"error","Internal servser error!",500);
 }
    
};

//controller to get all bloodbanks
exports.allBloodBanks = async (req, res) => {
   try {
      const data = await bloodBankService.allBldBankData({});
      return success(res, data, "All Blood banks", 200);  
   } catch (err) {
      console.log(err);
      return error(res,"error!","internal server error",500);
   }
   
 };

 
