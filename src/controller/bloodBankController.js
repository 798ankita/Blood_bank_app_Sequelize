const userService = require('../services/user_service');
const bloodBankService = require('../services/bloodBank');
const inventoryService = require('../services/bloodInventory');
const bloodPriceService = require('../services/bloodPrice');
const { success, error } = require('../utils/user_utils');
// const data = require('../middleware/userMiddleware');
// const { bloodInventory } = require('../models');

// controller for adding blood bank detail
exports.bldBankDetails = async (req, res) => {
  try {
    const userId = req.data;
    const userToken = await userService.findUser({id:userId});
    const Id = userToken.id;
    const findId = await bloodBankService.findId({userId:Id});
    if (userToken.status == 'active'&& findId == null) {
      const details = await bloodBankService.bloodBankDetail(Id , {
        name: req.body.name,
        logo: req.body.logo,
        address: req.body.address,
        description: req.body.description,
        status: 'active',
        created_by: userToken.username,
        updated_by: userToken.username,
        UserId: userToken.id,
      });
      return success(res, details, 'blood bank added successfully', 200);
    }
    return error(
      res,
      'Permission denied',
      'do not have permission to add blood bank or blood bank already added by you!',
      403,
    );
  } catch (err) {
    console.log(err);
    return error(res, 'error', 'Internal server error!', 500);
  }
};

// controller to get all bloodbanks.
exports.allBloodBanks = async (req, res) => {
  try {
    const data = await bloodBankService.allBldBankData();
    return success(res, data, 'All Blood banks', 200);
  } catch (err) {
    console.log(err);
    return error(res, 'error!', 'internal server error', 500);
  }
};

// controller to add blood Inventory details.
exports.bloodInventory = async (req, res) => {
  try {
    const userId = req.data;
    const userToken = await userService.findUser({id:userId});
    const Id = userToken.id;
    const bloodBankId = await bloodBankService.findId({UserId:Id});
    const bankId = bloodBankId.id;
    const allData = await inventoryService.findInventory({bloodBankId:bankId});
    if (bloodBankId.status == 'active' && allData == null || allData < 1){
      const details = await inventoryService.addInventory({
        AB_positive: req.body.AB_positive,
        A_positive: req.body.A_positive,
        B_positive: req.body.B_positive,
        O_positive: req.body.O_positive,
        AB_negative: req.body.AB_negative,
        A_negative: req.body.A_negative,
        B_negative: req.body.B_negative,
        O_negative: req.body.O_negative,
        created_by: userToken.username,
        updated_by: userToken.username,
        bloodBankId: bloodBankId.id,
      });
      return success(res, details, 'blood Inventory added successfully', 200);
    }
    return error(res, 'permission denied', 'already added inventory', 208);
  } catch (err) {
    console.log(err);
    return error(res, 'error', 'internal server error', 500);
  }
};

// controller to add blood price.
exports.bloodPrice = async (req, res) => {
  try {
    const id = req.data;
    const userToken = await userService.findUser({id:id});
    const bloodBankId = await bloodBankService.findId({userId:id});
    const bankId = bloodBankId.id;
    const inventoryData = await inventoryService.findInventory({bloodBankId:bankId});
    const priceData = await bloodPriceService.findId({bloodBankId:bankId});
    if (bloodBankId.status == 'active' && inventoryData != null && priceData == null) {
      const details = await bloodPriceService.addBloodPrice({
        AB_positive: req.body.AB_positive,
        A_positive: req.body.A_positive,
        B_positive: req.body.B_positive,
        O_positive: req.body.O_positive,
        AB_negative: req.body.AB_negative,
        A_negative: req.body.A_negative,
        B_negative: req.body.B_negative,
        O_negative: req.body.O_negative,
        created_by: userToken.username,
        updated_by: userToken.username,
        bloodBankId: bloodBankId.id,
      });
      return success(res, details, 'blood prices added successfully', 200);
    }
    return error(res, 'permission denied', 'already added prices', 208);
  } catch (err) {
    console.log(err);
    return error(res, 'error', 'Permission denied', 403);
  }
};

// update inventory details.
exports.updatedInventory = async (req, res) => {
  try {
    const id = req.data;
    const userToken = await userService.findUser({id:id});
    const userId = userToken.id;
    const bloodBank = await bloodBankService.findId({UserId:userId});
    if (bloodBank.status == 'active') {
      const data = await inventoryService.updateInventory(
        userToken.id,
        req.body,
      );
      return success(res, data, 'inventory updated successfully', 200);
    }
    return error(res, error, 'process denied', 403);
  } catch (err) {
    console.log(err);
    return error(res, error, 'process denied', 403);
  }
};

// update blood price per unit details.
exports.updateBloodPrice = async (req, res) => {
  try {
    const id = req.data;
    const userToken = await userService.findUser({id:id});
    const userId = userToken.id;
    const bloodBank = await bloodBankService.findId({UserId:userId});
    // const bloodBankId = await bloodPriceService.findId(bloodBank.id);
    if (bloodBank.status == 'active') {
      const data = await bloodPriceService.updatePriceDetails(
        userToken.id,
        req.body,
      );
      return success(res, data, 'blood price updated successfully', 200);
    }
    return error(res, error, 'permission denied', 403);
  } catch (err) {
    console.log(err);
    return error(res, error, 'permission denied', 403);
  }
};
