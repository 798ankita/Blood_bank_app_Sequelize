const userService = require("../services/user_service");
const actionService = require("../services/action");
const { success, error } = require("../utils/user_utils");
const data = require("../middleware/userMiddleware");

//controller to get all request created by users for blood
exports.getAllBloodRequests = async (req, res) => {
    try {
        const data = await userService.userId(req.data);
        const requestData = await actionService.findRequests(data.id);
        if(requestData.length > 0){
          return success(res,requestData,"All requests for blood",200);
        }else{
          return success(res," ","requests not avalable",200);
        }    
    }catch (err) {
        console.log(err); 
        return error(res,"error","Internal server error",500);
    }  
  };

  //Accept Registration Requests from blood_bank by super_user
exports.acceptBloodRequest = async (req, res) => {
    try {
      const data = await userService.userId(req.data);
      const requestData = await actionService.findId(req.body.id);
      if (data.role == "blood_bank" && data.id == requestData.bloodbankId) 
      {
      const requestAccept = await actionService.acceptBloodRequest(req.body.id);
        if (requestAccept != null) {
          return success(
            res,
            requestAccept,
            "your request has been approved",
            202
          );
        }
        else{
          return error(res, "error!", "do not have permission!", 400);
        }
    }else{
      return success(res, " ", "no data found", 204);
    }
  }
  catch (err) {
    console.log(err);
    return error(res, "error!", "Internal server error", 500);}
}