const bloodBankService = require("../services/bloodBank");
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
        success(res, data, "All users data", 200);  
    }   catch (err) {
        console.log(err); 
    }
    
  };