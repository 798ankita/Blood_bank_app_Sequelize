const bloodBankCtrl = require("../controller/bloodBankController");
const actionCtrl = require("../controller/actionController");

/***************************************bloodBank details*********************************/
//route to add blood bank details.
exports.createBloodBank = bloodBankCtrl.bldBankDetails;

//route to see all blood banks list.
exports.allBloodBankDetail = bloodBankCtrl.allBloodBanks;

//route to see all blood requests created by user
exports.allRequestsForBlood = actionCtrl.getAllBloodRequests;

//route to accept blood requests created by user.
exports.acceptBloodRequests = actionCtrl.acceptBloodRequest;

//route to add blood Inventory by blood bank.
exports.addBloodInventory = bloodBankCtrl.bloodInventory;

//route to update blood Inventory by blood bank.
exports.updateBloodInventory = bloodBankCtrl.updatedInventory;

//route to add blood prices by blood bank.
exports.addBloodPrice = bloodBankCtrl.bloodPrice;

//route to update blood price per unit table .
exports.updateBloodPrice = bloodBankCtrl.updateBloodPrice;

//route to update blood unit while collecting blood.
exports.IncrementBlood = actionCtrl.bloodCollected;

