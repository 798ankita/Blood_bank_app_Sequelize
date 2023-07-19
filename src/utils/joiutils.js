const Joi = require("joi");
const jwt = require('jsonwebtoken');
const secretKey = "5C2384E829DF83F5";
/*@Params:user
  @Description:function to validate user data during registration
 */
const userUtils = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),

    username: Joi.string().min(6).max(20).required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),

    gender: Joi.string().max(10).required(),

    contact: Joi.number().integer().min(10),

    age: Joi.number().integer().min(3),

    address: Joi.string().max(100).required(),

    email: Joi.string().email().min(6).max(50).optional(),

    role: Joi.string().min(3).max(40).required(),

    blood_group: Joi.string().max(15).required(),

    state: Joi.string().max(15).required(),

    city: Joi.string().max(15).required(),
  }).options({ abortEarly: false });

  return schema.validate(user);
};

const jwtlogin = (data) =>{
  return jwt.sign({data},secretKey, {expiresIn:"300s"});
};

module.exports = {userUtils,jwtlogin};
