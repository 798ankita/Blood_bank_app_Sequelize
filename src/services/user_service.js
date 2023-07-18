const db = require("../models/index");
const User = db.user;
const sequelize = db.sequelize;

/* @Params:userData
   @Description:This function creates users
*/
exports.postUsers = async (userData) => {
  try {
    await sequelize.sync();
    const user = await User.create(userData);
    return user;
  } catch (err) {
    throw err;
  }
};

/* @Params:userMail
   @Description:This function find existing user with email
*/
exports.checkEmail = async (userMail) => {
    try {
      await sequelize.sync();
      const user = await User.findOne({ where: { email:userMail } });
      return user;
    } 
    catch (err) {
    throw err;
    }
  };

/*@Params:userdData
  @Description:This function is used to get all users data
  */
exports.getUsers = async (usersData) => {
  try {
    await sequelize.sync();
    const users = await User.findAll({});
    return users;
  } catch (err) {
    throw err;
  }
};
