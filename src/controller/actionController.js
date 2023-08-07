const userService = require("../services/user_service");
const actionService = require("../services/action");
const inventoryServices = require("../services/bloodInventory");
const bloodBankService = require("../services/bloodBank");
const paymentService = require("../services/paymentDetail");
const bloodPriceService = require("../services/bloodPrice");
const { success, error } = require("../utils/user_utils");
const data = require("../middleware/userMiddleware");

//controller to get all request created by users for blood
exports.getAllBloodRequests = async (req, res) => {
  try {
    const data = await userService.userId(req.data);
    const requestData = await actionService.findRequests(data.id);
    if (requestData.length > 0) {
      return success(res, requestData, "All requests for blood", 200);
    } else {
      return success(res, " ", "requests not avalable", 200);
    }
  } catch (err) {
    console.log(err);
    return error(res, "error", "Internal server error", 500);
  }
};

//Accept blood requests by blood bank of patient
exports.acceptBloodRequest = async (req, res) => {
  try {
    const data = await userService.userId(req.data);
    const bloodBank = await bloodBankService.findId(data.id);
    const requestData = await actionService.findRequestId(req.body.id);

    if (
      requestData != null &&
      requestData.status == "pending" &&
      data.role == "blood_bank" &&
      requestData.action == "patient" &&
      bloodBank.id == requestData.bloodbankId
    ) {
      const requestAccept = await actionService.acceptBloodRequest(
        req.body.id,
        { updated_by: data.username }
      );
      if (requestAccept) {
        const bloodBankId = requestData.bloodbankId;
        const reqBloodGroup = requestData.blood_group;
        const reqBloodUnits = requestData.blood_unit;
        const inventory = await inventoryServices.findId(bloodBankId);
        const inventoryBlood = inventory[reqBloodGroup];
        const totalBloodUnit = inventoryBlood - reqBloodUnits;
        const mydata = {};
        mydata[requestData.blood_group] = totalBloodUnit;
        const decrementData = await inventoryServices.updateAutoInventory(
          bloodBank.id,
          mydata
        );
        return success(
          res,
          decrementData,
          "your request has been approved, Please complete the payment",
          202
        );
      }
    } else if (
      requestData.status == "pending" &&
      data.role == "blood_bank" &&
      requestData.action == "donor" &&
      bloodBank.id == requestData.bloodbankId
    ) {
      const requestAccept = await actionService.acceptBloodRequest(
        req.body.id,
        { updated_by: data.username }
      );
      return success(
        res,
        requestAccept,
        "request approved, scheduled blood donation date: 9/3/2023",
        202
      );
    } else {
      return success(res, " ", "no data found", 200);
    }
  } catch (err) {
    console.log(err);
    return error(res, "error!", "Internal server error", 500);
  }
};

//generate bill and send to user
exports.generateBill = async (req, res) => {
  try {
    const userData = await userService.userId(req.data);
    const requestData = await actionService.findRequestId(req.body.id);
    const reqBloodGroup = requestData.blood_group;
    const reqBloodUnits = requestData.blood_unit;
    const bloodPrice = await bloodPriceService.findId(requestData.bloodbankId);
    const priceTableBlood = bloodPrice[reqBloodGroup];
    const totalAmount = priceTableBlood * reqBloodUnits;
    const checkPaymentId = await paymentService.findReqId(requestData.id);
    if (
      checkPaymentId.status == "pending" &&
      userData.role == "user" &&
      requestData.status == "approved" &&
      requestData.bloodbankId == bloodPrice.bloodBankId
    ) {
      const updateBillAmount = await paymentService.updateAmount(
        requestData.id,
        totalAmount
      );
      return success(res, updateBillAmount, "payment complete", 200);
    } else {
      return error(
        res,
        "permission denied",
        "request can not be completed",
        400
      );
    }
  } catch (err) {
    console.log(err);
  }
};

//increment in inventory while collecting blood from donor.
exports.bloodCollected = async (req, res) => {
  try {
  const data = await userService.userId(req.data);
  const requestData = await actionService.findRequestId(req.body.id);
  const bloodBank = await bloodBankService.findId(data.id);
  if (
    requestData != null &&
    requestData.status == "approved" &&
    data.role == "blood_bank" &&
    requestData.action == "donor" &&
    bloodBank.id == requestData.bloodbankId
  ) 
    {
      const bloodBankId = requestData.bloodbankId;
      const reqBloodGroup = requestData.blood_group;
      const reqBloodUnits = requestData.blood_unit;
      const inventory = await inventoryServices.findId(bloodBankId);
      const inventoryBlood = inventory[reqBloodGroup];
      const totalBloodUnit = inventoryBlood + reqBloodUnits;
      const mydata = {};
      mydata[requestData.blood_group] = totalBloodUnit;
      const IncrementData = await inventoryServices.inventoryUpdateDonation(
        bloodBank.id,
        mydata
      );
      return success(
        res,
        IncrementData,
        "donation complete",
        202
      );
  }

  } catch (err) {
    console.log(err);
  }
  
};
