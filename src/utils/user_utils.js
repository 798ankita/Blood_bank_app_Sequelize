const Joi = require("joi");
const jwt = require('jsonwebtoken');
/*@Params:user
  @Description:function to validate user data during registration
 */
const userUtils = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),

    username: Joi.string().alphanum()
     .min(3)
    .max(30)
    .required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),

    gender: Joi.string().max(10).required(),

    contact: Joi.number().integer().min(10),

    age: Joi.number().integer().min(3),

    address: Joi.string().max(100).required(),

    email: Joi.string() .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    role: Joi.string().min(3).max(40).required(),

    blood_group: Joi.string().max(15).required(),

    state: Joi.string().max(15).required(),

    city: Joi.string().max(15).required(),
  })

  return schema.validate(user);
};

/*@Params:user
  @Description:function to validate user data while updating
 */
  const updateUser = (user) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(40).optional(),
  
      username: Joi.string().alphanum()
       .min(3)
      .max(30)
      .optional(),
  
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).optional(),
  
      gender: Joi.string().max(10).optional(),
  
      contact: Joi.number().integer().min(10).optional(),
  
      age: Joi.number().integer().min(3).optional(),
  
      address: Joi.string().max(100).optional(),
  
      email: Joi.string() .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  
      role: Joi.string().min(3).max(40).optional(),
  
      blood_group: Joi.string().max(15).optional(),
  
      state: Joi.string().max(15).optional(),
  
      city: Joi.string().max(15).optional(),
    })
  
    return schema.validate(user);
  };


//token validation
const jwtLogin = (data) =>{
  // console.log(data);
  return jwt.sign({data},process.env.JWT_SECRET_KEY, {expiresIn:"600s"});
};

//function to send responses

// const sendResponse = () => {

// }

module.exports = {userUtils,updateUser,jwtLogin};
