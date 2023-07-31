const bloodBankCtrl = require("../controller/bloodBankController");
const actionCtrl = require("../controller/actionController");

/***************************************bloodBank details*********************************/
//route to add blood bank details.
exports.createBloodBank = bloodBankCtrl.bldBankDetails;

//route to see all blood banks list.
exports.allBloodBankDetail = bloodBankCtrl.allBloodBanks;

//route to see all blood requests created by user
exports.allRequestsForBlood = actionCtrl.getAllBloodRequests;


