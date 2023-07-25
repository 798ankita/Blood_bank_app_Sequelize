const userMiddleware= require("../utils/user_utils");
const {success,error} = require("../utils/user_utils")
const jwt = require("jsonwebtoken");

/*@Params:(req, res, next)
  @Request:req.body
  @Response:res.status(400)
  @Description:Middleware for user registration
*/

const data = (req, res, next) => {
  user = req.body;
  response = userMiddleware.userUtils(user);
  if (response.error) {
    error(res,response.error.details[0].message,"error occured while creating user",400);
  } else {
    next();
  }
};

/*@params:req,res,next,
  @Request:req.body
  @Response:res.status(400)
  @Description:middleware to update user data*/
const updatedUser =(req, res, next) => {
 try {
  user = req.body;
  response = userMiddleware.updateUser(user);
  if (response.error) {
    error(res,response.error.details[0].message,"error occured while updating user",400);
  } else {
    next();
  }
 } catch (error) {
  throw(error);
 }
  
};

/*@params:req,res,next
  @Request:req.body
  @Description:login middleware with jwt token*/
const login = async(req, res, next) => {
  const data = req.body;
  const token = await userMiddleware.jwtLogin(data);
  console.log("my token" +token);
  req.token = token;
  next();
};

/*@params:req,res,next
  @Request:req.body
  @Response:res.status(403),res.status(401)
  @description:middleware to verify jwt token*/
const verifyToken = async(req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    error(res,"error","No token provided!",403);
  }
  const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY,
  //  async (err) => {
  //   if (err) {
  //     error(res,"error","Unauthorized user!",401);
  //   }
  // }
  );
  req.data = verifyToken
    next();
};

module.exports = { data, updatedUser, login, verifyToken };
