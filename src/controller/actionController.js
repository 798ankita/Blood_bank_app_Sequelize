const userService = require("../services/user_service");
const actionService = require("../services/action");
const { success, error } = require("../utils/user_utils");
const data = require("../middleware/userMiddleware");

//controller to get all request created by users for blood
exports.getAllBloodRequests = async (req, res) => {
    try {
        const userData = req.data;
        const userToken = await userService.userId(userData);
        const data = await actionService.allRequests({});
        return success(res, data, "All requests for blood", 200);  
    }catch (err) {
        console.log(err); 
        return error(res,"error","Internal server error",500);
    }  
  };

  //Accept Registration Requests from blood_bank by super_user
const acceptBloodRequest = async (req, res) => {
    try {
      const data = await userService.userId(req.data);
      if (data.role == "blood_bank") {
        const requestAccept = await actionService.acceptBloodRequest(req.body.username);
        if (requestAccept != null) {
          return success(
            res,
            requestAccept,
            "your request has been approved",
            200
          );
        }
        return error(res, "error!", "do not have permission!", 400);
      }
    } catch (err) {
      console.log(err);
      return error(res, "error!", "Internal server error", 500);
    }
  };
  