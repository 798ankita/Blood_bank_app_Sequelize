const userService = require('../services/user_service');
const actionService = require('../services/action');
const inventoryServices = require('../services/bloodInventory');
const bloodBankService = require('../services/bloodBank');
const paymentService = require('../services/paymentDetail');
const bloodPriceService = require('../services/bloodPrice');
const { success, error } = require('../utils/user_utils');

// controller to get all request created by users for blood
exports.getAllBloodRequests = async (req, res) => {
  try {
    const id = req.data;
    const data = await userService.findUser({id:id});
    const UserId = data.id;
    const requestData = await actionService.findRequests({UserId:UserId});
    if (requestData.length > 0) {
      return success(res, requestData,message.all_blood_requests,statusCode.Success);
    }
    return success(res, ' ',message.req_not_available,statusCode.Success );
  } catch (err) {
    console.log(err);
    return error(res,err,message.server_error,statusCode.internal_server_error);
  }
};

// Accept blood requests by blood bank of patient
exports.acceptBloodRequest = async (req, res) => {
  try {
    const id = req.data;
    const data = await userService.findUser({id:id});
    const Id = data.id;
    const bloodBank = await bloodBankService.findId({UserId:Id});
    const bloodbankId = req.body.id;
    const requestData = await actionService.findRequestId({id:bloodbankId});
    if (
      requestData != null
      && requestData.status == 'pending'
      && requestData.action == 'patient'
      && bloodBank.id == requestData.bloodbankId
    ) {
      const requestAccept = await actionService.acceptBloodRequest(
        req.body.id,
        { updated_by: data.username },
      );
      if (requestAccept) {
        const bloodBankId = requestData.bloodbankId;
        const reqBloodGroup = requestData.blood_group;
        const reqBloodUnits = requestData.blood_unit;
        const inventory = await inventoryServices.findInventory({bloodBankId:bloodBankId});
        const inventoryBlood = inventory[reqBloodGroup];
        const totalBloodUnit = inventoryBlood - reqBloodUnits;
        const mydata = {};
        mydata[requestData.blood_group] = totalBloodUnit;
        const decrementData = await inventoryServices.updateAutoInventory(
          bloodBank.id,
          mydata,
        );
        return success(
          res,
          decrementData,
          message.do_payment,
          statusCode.Accepted,
        );
      }
    } else if (
      requestData.status == 'pending'
      && requestData.action == 'donor'
      && bloodBank.id == requestData.bloodbankId
    ) {
      const requestAccept = await actionService.acceptBloodRequest(
        req.body.id,
        { updated_by: data.username },
      );
      return success(
        res,
        requestAccept,
        message.donation_date_scheduled,
        statusCode.Accepted,
      );
    } else {
      return success(res, ' ',message.data_not_found,statusCode.Success);
    }
  } catch (err) {
    console.log(err);
    return error(res,err,message.server_error,statusCode_internal_server_error);
  }
};

// generate bill and send to user
exports.generateBill = async (req, res) => {
  try {
    //const userData = await userService.userId(req.data);
    const reqId = req.body.id;
    const requestData = await actionService.findRequestId({id:reqId});
    const reqBloodBankId =requestData.bloodbankId ;
    const reqBloodGroup = requestData.blood_group;
    const reqBloodUnits = requestData.blood_unit;
    const bloodPrice = await bloodPriceService.findId({bloodBankId:reqBloodBankId});
    const priceTableBlood = bloodPrice[reqBloodGroup];
    const totalAmount = priceTableBlood * reqBloodUnits;
    const requestDataId = requestData.id;
    const checkPaymentId = await paymentService.findReqId({userActionId:requestDataId});
    if (checkPaymentId.status == 'pending'&& requestData.status == 'approved'
      && reqBloodBankId == bloodPrice.bloodBankId
    ) {
      const updateBillAmount = await paymentService.updateAmount(
        requestData.id,
        totalAmount,
      );
      return success(res, updateBillAmount,message.payment_complete,statusCode.Success);
    }
    return error(
      res,
      ' ',
      message.permission_denied,
      statusCode.BadRequest,
    );
  } catch (err) {
    console.log(err);
  }
};

// increment in inventory while collecting blood from donor.
exports.bloodCollected = async (req, res) => {
  try {
    const reqData = req.data;
    const reqId = req.body.id;
    const data = await userService.findUser({id:reqData});
    const dataId = data.id;
    const requestData = await actionService.findRequestId({id:reqId});
    const bloodBank = await bloodBankService.findId({UserId:dataId});
    if (
      requestData != null
    && requestData.status == 'approved'
    && requestData.action == 'donor'
    && bloodBank.id == requestData.bloodbankId
    ) {
      const bloodBankId = requestData.bloodbankId;
      const reqBloodGroup = requestData.blood_group;
      const reqBloodUnits = requestData.blood_unit;
      const inventory = await inventoryServices.findInventory({bloodBankId});
      const inventoryBlood = inventory[reqBloodGroup];
      const totalBloodUnit = inventoryBlood + reqBloodUnits;
      const mydata = {};
      mydata[requestData.blood_group] = totalBloodUnit;
      const IncrementData = await inventoryServices.inventoryUpdateDonation(
        bloodBank.id,
        mydata,
      );
      return success(
        res,
        IncrementData,
        message.donation_complete,
        statusCode.Accepted,
      );
    }
  } catch (err) {
    console.log(err);
    return error(res,' ',message.server_error,statusCode.internal_server_error);
  }
};
