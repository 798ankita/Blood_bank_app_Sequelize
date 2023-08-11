const jwt = require('jsonwebtoken');
const getId = require('../services/user_service');
const { success, error } = require('../utils/user_utils');
// generate token
exports.jwtLogin = async (data) => {
  const username = data.username;
  const userId = await getId.findUser({username});
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
