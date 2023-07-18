const db = require('../models/index');
const User = db.user;
const sequelize = db.sequelize;

exports.postUsers = async (userData) => {
try {
 await sequelize.sync();
 const user = await User.create(userData)
 return user;
}catch(err){
throw err('error');
}
}