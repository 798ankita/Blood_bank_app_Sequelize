/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable keyword-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const service = require('../services/user_service');
const actionService = require('../services/action');
const bloodBankservice = require('../services/bloodBank');
const bloodInventService = require('../services/bloodInventory');
const paymentService = require('../services/paymentDetail');
const { success, error } = require('../utils/user_utils');

// controller for registration
exports.postUsers = async (req, res) => {
  const email = await service.checkEmail(req.body.email);
  const username = await service.checkUsername(req.body.username);
  if (email == null && username == null && req.body.role == 'user') {
    const data = await service.postUsers({
      name: req.body.name,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      contact: req.body.contact,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      email: req.body.email,
      role: req.body.role,
      blood_group: req.body.blood_group,
      created_by: req.body.username,
      updated_by: req.body.username,
      status: 'active',
    });
    success(res, data, 'User created successfully', 201);
  } else if (req.body.role == 'blood_bank') {
    const data = await service.postUsers({
      name: req.body.name,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      contact: req.body.contact,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      email: req.body.email,
      role: req.body.role,
      blood_group: 'null',
      created_by: req.body.username,
      updated_by: req.body.username,
      status: 'deactivate',
    });
    return success(
      res,
      data,
      'Your request for registration is received and pending for approval!',
      201,
    );
  } else if (req.body.role == 'super_user') {
    return error(
      res,
      null,
      'Can not register to this role,please choose another role!',
      400,
    );
  } else {
    return error(
      res,
      null,
      'User with this email or username already exist',
      400,
    );
  }
};

// controller to get all users
exports.getUsers = async (req, res) => {
  const data = await service.getUsers({});
  success(res, data, 'All users data', 200);
};

// update a user
try {
  exports.updatedUser = async (req, res) => {
    const userData = req.data;
    const userToken = await service.userId(userData);
    const data = await service.updateUser(userToken.id, req.body);
    success(res, data, 'user data updated successfully', 200);
  };
} catch (err) {
  console.log(err);
}

// get one user
try {
  exports.getUser = async (req, res) => {
    try {
      const userData = req.data;
      const userToken = await service.userId(userData);
      const data = await service.getUser(userToken.id, req.body);
      console.log(data);
      success(res, data, 'user data', 200);
    } catch (err) {
      console.log(err);
    }
  };
} catch (err) {
  console.log(err);
}

// delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.data;
    await service.deleteUser(userId);
    success(res, '', 'User deleted successfully', 200);
  } catch (err) {
    console.log(err);
  }
};

// login a user

exports.loginUser = async (req, res) => {
  try {
    const loginData = await service.loginAuth(req.body.username);
    if (loginData != null) {
      if (
        (await bcrypt.compare(req.body.password, loginData.password))
        && loginData.status == 'active'
      ) {
        // Passwords matched
        return res.status(200).json({
          status: '200',
          data: loginData,
          message: 'User login successfully',
          token: req.token,
        });
      } if (loginData.status == 'deactivate') {
        return error(
          res,
          "Can't login, Registration request pending for approval",
          'Registration pending for approval',
          213,
        );
      }
      // Passwords not matched
      return error(res, 'invalid credentials', 'wrong password', 401);
    }
    // invalid credentials for login
    return error(res, 'error', 'Invalid credentials', 401);
  } catch (err) {
    return error(res, 'error', 'Internal Server Error', 500);
  }
};

// function to logout user
exports.logoutUser = (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    // eslint-disable-next-line no-unused-vars
    jwt.sign(token, ' ', { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        return success(res, '', 'You have been Logged Out', 200);
      }
      return error(res, 'error', 'Internal Server Error', 500);
    });
  } catch (err) {
    console.log(err);
  }
};

// Pending Registration Requests of blood_banks to super_user
exports.pendingRegister = async (req, res) => {
  try {
    const data = await service.userId(req.data);

    if (data.role == 'super_user') {
      const declineReq = await service.bloodBankRegisterReq();
      if (declineReq == null) {
        return success(res, 'data not found', 'No requests available', 200);
      }
      return success(res, declineReq, 'All requests', 200);
    }
    return error(res, 'error!', 'do not have permission!', 400);
  } catch (err) {
    console.log(err);
  }
};

// Accept Registration Requests from blood_bank by super_user
exports.AcceptedRequests = async (req, res) => {
  try {
    const data = await service.userId(req.data);

    if (data.role == 'super_user') {
      const requestAccept = await service.acceptedRequests(req.body.username);
      if (requestAccept != null) {
        return success(
          res,
          requestAccept,
          'your request has been approved',
          200,
        );
      }
      return error(res, 'error!', 'do not have permission!', 400);
    }
  } catch (err) {
    console.log(err);
    return error(res, 'error!', 'Internal server error', 500);
  }
};

// Decline Registration Requests from blood_bank by super_user
exports.declineRegister = async (req, res) => {
  try {
    const data = await service.userId(req.data);

    if (data.role == 'super_user') {
      const declineReq = await service.declineRequests(req.body.username);
      if (declineReq !== null) {
        return success(res, declineReq, 'your request has been declined', 200);
      }
      return error(res, 'error!', 'do not have permission!', 400);
    }
  } catch (err) {
    console.log(err);
    return error(res, 'error!', 'Internal server error', 500);
  }
};

// controller to create requests for blood by patient user .
exports.patientSendRequests = async (req, res) => {
  try {
    const userId = req.data;
    const bloodGroup = req.body.blood_group;
    const bloodBankName = req.body.bloodBank;
    const userToken = await service.userId(userId);
    const chooseBloodBank = await bloodBankservice.findName(bloodBankName);
    const checkForBlood = await bloodInventService.findInventory(chooseBloodBank.id);

    if (checkForBlood[bloodGroup] > 0) {
      const requestData = await service.sendRequest({
        blood_group: req.body.blood_group,
        action: 'patient',
        required_date: req.body.required_date,
        blood_unit: req.body.blood_unit,
        status: 'pending',
        created_by: userToken.username,
        bloodBank: req.body.bloodBank,
        UserId: userToken.id,
        bloodbankId: chooseBloodBank.id,
      });
      if (requestData) {
        // eslint-disable-next-line no-unused-vars
        const paymentDetail = await paymentService.paymentBill({
          status: 'pending',
          created_by: req.body.bloodBank,
          updated_by: req.body.bloodBank,
          bloodBankId: chooseBloodBank.id,
          UserId: userToken.id,
          userActionId: requestData.id,
        });
      }

      return success(res, requestData, 'request generated successfully', 200);
    }
    return error(res, 'not found', 'requested blood not available', 400);
  } catch (err) {
    console.log(err);
  }
};

// controller to create requests to donate blood by donor user .
exports.donorSendRequest = async (req, res) => {
  try {
    const userId = req.data;
    const bloodBankName = req.body.bloodBank;
    const userToken = await service.userId(userId);
    const chooseBloodBank = await bloodBankservice.findName(bloodBankName);
    const requestData = await service.sendRequest({
      blood_group: userToken.blood_group,
      action: 'donor',
      blood_unit: '1',
      status: 'pending',
      donation_date: req.body.donation_date,
      created_by: userToken.username,
      updated_by: userToken.username,
      bloodBank: req.body.bloodBank,
      UserId: userId,
      bloodbankId: chooseBloodBank.id,
    });
    return success(res, requestData, 'request generated successfully', 200);
  } catch (err) {
    console.log(err);
  }
};
// function to cancel request
exports.cancelRequest = async (req, res) => {
  try {
    const userId = req.data;
    const requestId = req.body.id;
    const userToken = await service.userId(userId);
    const findRequest = await actionService.cancelRequestForBld(requestId, {
      updated_by: userToken.username,
    });
    success(res, findRequest, 'Request cancelled successfully', 200);
  } catch (err) {
    console.log(err);
  }
};
