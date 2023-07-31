const Joi = require("joi");
const jwt = require("jsonwebtoken");
const getId = require("../services/user_service");
/*@Params:user
  @Description:function to validate user data during registration
 */
const userUtils = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),

    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),

    contact: Joi.number().integer().min(10),

    address: Joi.string().max(100).required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    role: Joi.string().min(3).max(40).required(),

    blood_group: Joi.string().max(15).required(),

    state: Joi.string().max(15).required(),

    city: Joi.string().max(15).required(),
  });

  return schema.validate(user);
};

/*@Params:user
  @Description:function to validate user data while updating
 */
const updateUser = (user) => {
  const schema = Joi.object({
    
    name: Joi.string().min(3).max(40).optional(),

    username: Joi.string().alphanum().min(3).max(30).optional(),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
      .optional(),

    contact: Joi.number().integer().min(10).optional(),

    address: Joi.string().max(100).optional(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .optional(),

    role: Joi.string().min(3).max(40).optional(),

    blood_group: Joi.string().max(15).optional(),

    state: Joi.string().max(15).optional(),

    city: Joi.string().max(15).optional(),
  });

  return schema.validate(user);
};

//generate token 
const jwtLogin = async (data) => {
  console.log(data);
  const userId = await getId.checkUsername(data.username);
  // console.log("my Data "+userId.id);
  // console.log(userId);
  if (userId){
    return jwt.sign({id:userId.id, username:userId.username},process.env.JWT_SECRET_KEY, { expiresIn: "2000s" });
   
  }
  else{
    return "user not exist";
  }
  };

const success = (res, data, message, statuscode) => {
  res.status(statuscode).json({
    status: statuscode,
    data: data,
    message:message,
  });
};

const error = (res,error,message, statuscode) => {
  res.status(statuscode).json({
    status: statuscode,
    message:message,
    error:error
  });
};
module.exports = { userUtils, updateUser, jwtLogin, success, error };
