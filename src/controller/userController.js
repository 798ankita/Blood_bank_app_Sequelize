const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const service = require('../services/user_service');
const actionService = require('../services/action');
const bloodBankservice = require('../services/bloodBank');
const bloodInventService = require('../services/bloodInventory');
const paymentService = require('../services/paymentDetail');
const { success, error } = require('../utils/user_utils');
const message = require('../utils/message');
const statusCode = require('../utils/statusCode');

// controller for registration
exports.postUsers = async (req, res) => {
  try{
//joi validations to validate request data
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    username: Joi.string().alphanum().min(3).max(30)
      .required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9@]{3,30}$/),
    contact: Joi.number().integer().min(10),
    address: Joi.string().max(100).required(),
    state: Joi.string().max(15).required(),
    city: Joi.string().max(15).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    role: Joi.string().min(4).max(40).required(),
    blood_group: Joi.string().max(15).required(),
  }).options({ abortEarly: false });

  const { name, username, password, contact, address, state, city, email, role, blood_group} = req.body; 
  const { gotError } = schema.validate({ name, username, password, contact, address, state, city, email, role, blood_group});
  if (gotError) {
    return res.json( {message: gotError.details[0].message});
  }; 
  const userInfo = {name, username, password , contact, address, state, city, email, role, blood_group};
  userInfo.password = await bcrypt.hash(password,10);
  userInfo.created_by = username;
  userInfo.updated_by = username;
  userInfo.status = 'active';
  const checkEmail = await service.findUser({email:email});
  const checkUsername = await service.findUser({username:username});
  if (checkEmail == null && checkUsername == null) {
  if(role === 'user'){
  const data = await service.postUsers(userInfo);
  return success (res,data,message.registered,statusCode.Accepted);
  }
  else if (role === 'blood_bank')
  {
  userInfo.status = 'deactivate';
  const data = await service.postUsers(userInfo);
  return success (res,data,message.under_process,statusCode.Success);
  }else if (role === 'super_user');
  {
    return error(res,'change role', message.permission_denied, statusCode.BadRequest);
  }
}
else{
  return error (res,'',message.already_exists,statusCode.forbidden);
}
}
catch(err){
  return error(res,err,message.server_error,statusCode.internal_server_error);
}
};

// controller to get all users
exports.getUsers = async (req, res) => {
  try {
    const data = await service.getUsers();
 return success(res, data, message.success,statusCode.Success);

  } catch (err) {
    return error(res,err,message.server_error,statusCode.internal_server_error);
  }
};

// update a user
exports.updatedUser = async (req, res) => {
    try {  
      const schema = Joi.object({
              name: Joi.string().min(3).max(40),
              password: Joi.string().pattern(/^[a-zA-Z0-9@]{3,30}$/),
              contact: Joi.number().integer().min(10),
              address: Joi.string().max(100),
              state: Joi.string().max(15),
              city: Joi.string().max(15),
              email: Joi.string().email({minDomainSegments: 2,tlds: { allow: ['com', 'net'] },}),
              blood_group: Joi.string().max(15),
            }).options({ abortEarly: false });
    
  const { name,password, contact, address, state, city, email,blood_group} = req.body; 
  const { gotError } = schema.validate({ name, password, contact, address, state, city, email, blood_group});
  if (gotError) {
    return res.json( {message: gotError.details[0].message});
  }; 
  const userInfo = {name,password , contact, address, state, city, email,blood_group};
  //getting user data from token
  const userData = req.data;
  const userToken = await service.findUser({id:userData});
  const userId = userToken.id;
  const data = await service.updateUser(userId,userInfo);
    return success(res, data, message.updated,statusCode.Success);
  } catch (err) {
    return error(res,err,message.server_error,statusCode.internal_server_error);
  }
  };

// delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.data;
    await service.deleteUser(userId);
    success(res,' ',message.user_delete,statusCode.Success);
  } catch (err) {
    return error(res,err,message.server_error,statusCode.internal_server_error);
  }
};

// login a user
exports.loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const loginData = await service.findUser({username:username});
    const logPassword = loginData.password;
    const comparePwd = await bcrypt.compare(password,logPassword);
    if (loginData != null) {
      if ( comparePwd && loginData.status == 'active') {
        // Passwords matched
        return res.status(200).json({
          status: '200',
          data: loginData,
          message: 'User login successfully',
          token: req.token,
        });
      } if (loginData.status == 'deactivate') {
        return error(res," ",message.request_pending,statusCode.forbidden);
      }
      // Passwords not matched
      return error(res, 'invalid credentials', 'wrong password',statusCode.unauthorized);
    }
    // invalid credentials for login
    return error(res, 'error', 'Invalid credentials', 401);
  } catch (err) {
    return error(res,err,message.server_error,statusCode.internal_server_error);
  }
};

// function to logout user
exports.logoutUser = (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    jwt.sign(token, ' ', { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        return success(res, '', 'You have been Logged Out', 200);
      }
      return error(res, 'error', 'Internal Server Error', 500);
    });
  } catch (err) {
    return error(res,err,message.server_error,statusCode.internal_server_error);
  }
};

// Pending Registration Requests of blood_banks to super_user
exports.pendingRegister = async (req, res) => {
  try {
      const declineReq = await service.bloodBankRegisterReq();
      if (declineReq == null) {
        return success(res, 'data not found', 'No requests available',statusCode.Success);
      }return success(res, declineReq, 'All requests',statusCode.Success);
    } 
    catch (err) {
    return error(res,err,message.server_error,statusCode.internal_server_error);
}
};

// Accept Registration Requests from blood_bank by super_user
exports.AcceptedRequests = async (req, res) => {
  try {
       const reqId = req.body.id;
      const requestAccept = await service.acceptedRequests(reqId);
      if (requestAccept != null) {
        return success(res,requestAccept,message.request_approved,statusCode.Success);
      }
    return error(res, 'error!', 'do not have permission!', 400);
  } catch (err) {
    return error(res, 'error!', 'Internal server error', 500);
  }
};

// Decline Registration Requests from blood_bank by super_user
exports.declineRegister = async (req, res) => {
  try {
      const reqUsername = req.body.username;
      const declineReq = await service.declineRequests(reqUsername);
      if (declineReq !== null) {
      return success(res, declineReq, 'your request has been declined', 200);
      }return error(res, 'error!', 'do not have permission!', 400);
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
    const userToken = await service.findUser({id:userId});
    const chooseBloodBank = await bloodBankservice.findId({bloodBankName});
    const bloodBankId = chooseBloodBank.id;
    const checkForBlood = await bloodInventService.findInventory({bloodBankId});

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
    const userToken = await service.findUser({userId});
    const chooseBloodBank = await bloodBankservice.findId({bloodBankName});
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
// function to cancel blood request
exports.cancelRequest = async (req, res) => {
  try {
    const userId = req.data;
    const requestId = req.body.id;
    const userToken = await service.findUser({id:userId});
    const findRequest = await actionService.cancelRequestForBld(requestId, {
      updated_by: userToken.username,
    });
    success(res, findRequest, 'Request cancelled successfully', 200);
  } catch (err) {
    console.log(err);
  }
};
