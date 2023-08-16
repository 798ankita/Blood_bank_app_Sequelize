const jwt = require('jsonwebtoken');
const { success , error } = require('../utils/user_utils');
const userService = require('../services/user_service');
const message = require('../utils/message');
const statusCode = require('../utils/statusCode');
const userMiddleware = require('../utils/user_utils');

/* @params:req,res,next
  @Request:req.body
  @Description:login middleware with jwt token
*/
exports.login = async (req, res, next) => {
  const data = req.body;
  const token = await userMiddleware.jwtLogin(data);
  req.token = token;
  next();
};

/* @params:req,res,next
  @Response:res.status(403),res.status(401)
  @description:middleware to verify jwt token
*/
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    try {
      const validId = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.data = validId.id;
      next();
    } catch (err) {
      return error(res, 'error', 'Fail to authenticate', 500);
    }
  } else {
    return error(res, 'error', 'Unauthorized user!', 500);
  }
};
/*@params:req,res,next
 @Request:req.data
 @Description:function to check role of user
  */
exports.roleCheckUser= async(req,res,next) => {
  try{
    const userId = req.data;
    const userData = await userService.findUser({id:userId});
    const checkRole = userData.role;
  if(checkRole != 'user'){ return error(res,'error', message.permission_denied,statusCode.forbidden)}
  if(checkRole == null){ return error(res,'',message.not_exists,statusCode.forbidden)};
  }
  catch(err){
   return error(res,'',message.server_error,statusCode.internal_server_error);
  }
  next();
};

/*@params:req,res,next
 @Request:req.data
 @Description:function to check role of blood bank
  */
exports.roleCheckBloodBank= async(req,res,next) => {
  try{
    const userId = req.data;
    const userData = await userService.findUser({id:userId});
    const checkRole = userData.role;
  if(checkRole != 'blood_bank'){ return error(res,'error', message.permission_denied,statusCode.forbidden)}
  if(checkRole == null){ return error(res,'',message.not_exists,statusCode.forbidden)};
  }
  catch(err){
   return error(res,'',message.server_error,statusCode.internal_server_error);
  }
  next();
};

/*@params:req,res,next
 @Request:req.data
 @Description:function to check role of super user
  */
exports.roleCheckSuperUser= async(req,res,next) => {
  try{
  const userId = req.data;
  const userData = await userService.findUser({id:userId});
  const checkRole = userData.role;
  if(checkRole != 'super_user'){ return error(res,'error', message.permission_denied,statusCode.forbidden)}
  if(checkRole == null){ return error(res,'',message.not_exists,statusCode.forbidden)};
  }
  catch(err){
   return error(res,'',message.server_error,statusCode.internal_server_error);
  }
  next();
};