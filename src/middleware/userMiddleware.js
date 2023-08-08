/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const userMiddleware = require('../utils/user_utils');
const { error } = require('../utils/user_utils');

/* @Params:(req, res, next)
  @Request:req.body
  @Response:res.status(400)
  @Description:Middleware for user registration
*/

exports.data = (req, res, next) => {
  const user = req.body;
  const response = userMiddleware.userUtils(user);
  if (response.error) {
    error(res, response.error.details[0].message, 'error occured while creating user', 400);
  } else {
    next();
  }
};

/* @params:req,res,next,
  @Request:req.body
  @Response:res.status(400)
  @Description:middleware to update user data
*/
exports.updatedUser = (req, res, next) => {
  try {
    const user = req.body;
    const response = userMiddleware.updateUser(user);
    if (response.error) {
      error(res, response.error.details[0].message, 'error occured while updating user', 400);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

/* @params:req,res,next
  @Request:req.body
  @Description:login middleware with jwt token
*/
exports.login = async (req, res, next) => {
  // eslint-disable-next-line no-shadow
  const data = req.body;
  const token = await userMiddleware.jwtLogin(data);
  req.token = token;
  next();
};

/* @params:req,res,next
  @Request:req.body
  @Response:res.status(403),res.status(401)
  @description:middleware to verify jwt token
*/
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    try {
      const validId = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(validId);
      req.data = validId.id;
      next();
    } catch (err) {
      // console.log(err);
      return error(res, 'error', 'Fail to authenticate', 500);
    }
  } else {
    return error(res, 'error', 'Unauthorised user!', 500);
  }
};
