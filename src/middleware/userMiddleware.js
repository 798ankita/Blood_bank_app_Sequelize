const userMiddleware = require("../utils/joiutils");

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
};

//login middleware with jwt token
const login =(req,res,next) => {
    const data = req.body;
    const token =userMiddleware.jwtlogin(data);
    console.log(token);
    req.token = token;
    next()
}

module.exports = {data,login};
