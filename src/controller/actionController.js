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

  //Accept blood requests by blood bank of patient
exports.acceptBloodRequest = async (req, res) => {
    try {
      const data = await userService.userId(req.data);
      const requestData = await actionService.findId(req.body.id);
      if (data.role == "blood_bank" && data.id == requestData.bloodbankId && requestData.action == "patient") 
      {
      const requestAccept = await actionService.acceptBloodRequest(req.body.id,
        {updated_by:data.username});
        if (requestAccept != null) {
          return success(
            res,
            requestAccept,
            "your request has been approved, Please complete the payment",
            202
          );
        }
        else{
          return error(res, "error!", "do not have permission!", 400);
        }
    }else if(data.role == "blood_bank" && data.id == requestData.bloodbankId && requestData.action == "donor")
    {
      const requestAccept = await actionService.acceptBloodRequest(req.body.id,
        {updated_by:data.username});
        if (requestAccept != null) {
          return success(
            res,
            requestAccept,
            "request approved, scheduled blood donation date: 9/3/2023",
            202
          );
        }

    }
    else{
      return success(res," ","no data found", 204);
    }
  }
  catch (err) {
    console.log(err);
    return error(res, "error!", "Internal server error", 500);}
}