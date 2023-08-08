/* eslint-disable linebreak-style */
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const getId = require('../services/user_service');
/* @Params:user
  @Description:function to validate user data during registration
 */
exports.userUtils = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      // eslint-disable-next-line linebreak-style
      .required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9@]{3,30}$/),
    contact: Joi.number().integer().min(10),
    address: Joi.string().max(100).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    role: Joi.string().min(3).max(40).required(),
    blood_group: Joi.string().max(15).required(),
    state: Joi.string().max(15).required(),
    city: Joi.string().max(15).required(),
  });

  return schema.validate(user);
};

/* @Params:user
  @Description:function to validate user data while updating
 */
exports.updateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).optional(),

    username: Joi.string().alphanum().min(3).max(30)
      .optional(),

    password: Joi.string()
      .pattern(/^[a-zA-Z0-9@]{3,30}$/)
      .optional(),

    contact: Joi.number().integer().min(10).optional(),

    address: Joi.string().max(100).optional(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .optional(),

    role: Joi.string().min(3).max(40).optional(),

    blood_group: Joi.string().max(15).optional(),

    state: Joi.string().max(15).optional(),

    city: Joi.string().max(15).optional(),
  });

  return schema.validate(user);
};

// generate token
exports.jwtLogin = async (data) => {
  const userId = await getId.checkUsername(data.username);
  if (userId) {
    return jwt.sign(
      { id: userId.id, username: userId.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '2000s' },
    );
  }

  return 'user not exist';
};

exports.success = (res, data, message, statuscode) => {
  res.status(statuscode).json({
    status: statuscode,
    data,
    message,
  });
};

exports.error = (res, err, message, statuscode) => {
  res.status(statuscode).json({
    status: statuscode,
    message,
    err,
  });
};
