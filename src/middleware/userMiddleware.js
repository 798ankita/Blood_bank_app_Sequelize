const userMiddleware = require("../utils/user_utils");
const jwt = require('jsonwebtoken');

/*@Params:(req, res, next)
  @Request:req.body data
  @Response:res.status(400)
  @Description:Middleware for user registration
*/

const data = (req, res, next) => {
  user = req.body;
  response = userMiddleware.userUtils(user);
  if (response.error) {
    res.status(400).send({
      status: "400",
      message: "error occured while creating user",
      error: response.error.details[1].message,
    });
  } else {
    next();
  }
}

const updatedUser = (req, res, next) => {
  user = req.body;
  response = userMiddleware.updateUser(user);
  if (response.error) {
    res.status(400).send({
      status: "400",
      message: "error occured while updating user",
      error: response.error.details[1].message,
    });
  } else {
    next();
  }
}

//login middleware with jwt token
const login =(req,res,next) => {
    const data = req.body;
    const token =userMiddleware.jwtLogin(data);
    console.log(token);
    req.token = token;
    next();
}

//middleware to verify jwt token
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token,process.env.JWT_SECRET_KEY, async (err) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    next();
  });
};



module.exports = {data,updatedUser,login,verifyToken};
