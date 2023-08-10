const jwt = require('jsonwebtoken');
const getId = require('../services/user_service');
// generate token
exports.jwtLogin = async (data) => {
  const userId = await getId.checkUsername(data.username);
  if (userId != null && userId.role == 'user') {
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
