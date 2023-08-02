const userMiddleware = require("../utils/user_utils");
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
  @Description:middleware to update user data
*/
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
  @Description:login middleware with jwt token
*/
const login = async(req, res, next) => {
  const data = req.body;
  const token = await userMiddleware.jwtLogin(data);
  // console.log("my token" +token);
  req.token = token;
  next();
};

/*@params:req,res,next
  @Request:req.body
  @Response:res.status(403),res.status(401)
  @description:middleware to verify jwt token
*/
const verifyToken =(req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    try {
        const validId = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(validId);
        req.data = validId.id;
        next();
    } catch (err) {
      // console.log(err);
        return error(res,"error","Fail to authenticate",500);
    }
} else {
    return error(res,"error","Unauthorised user!",500);
}
  
};

module.exports = { data, updatedUser, login, verifyToken };
