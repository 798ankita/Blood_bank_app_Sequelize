const db = require('../models/index');

const User = db.user;
const { bloodBank } = db;
const { action } = db;

/* @Params:userData
   @Description:This function creates users
*/
exports.postUsers = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (err) {
    console.log(err);
  }
};

// /* @Params:superUserData
//    @Description:This function creates superuser
// */
// exports.postsuperUsers = async (userData) => {
//   try {
//     const user = await superUser.create(userData);
//     return user;
//   } catch (err) {
//     console.log(err);
//   }
// };

/* @Params:userMail
   @Description:This function find existing user with email
*/
exports.checkEmail = async (userMail) => {
  try {
    const user = await User.findOne({ where: { email: userMail } });
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:username
  @Description:This function find existing user with username
*/
exports.checkUsername = async (username) => {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:id
  @Description:This function find existing user's id
*/
exports.userId = async (id) => {
  try {
    const user = await User.findOne({ where: { id:id } });
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:usersData
  @Description:function to get all users data
*/
exports.getUsers = async (data) => {
  try {
    const users = await User.findAll({});
    return users;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:userData
  @Description:function to get one user data
  */
exports.getUser = async (id) => {
  try {
    const user = await User.findOne(data, {
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:userData
  @Description:function to update a user data
  */
exports.updateUser = async (id, data) => {
  try {
    const user = await User.update(data, {
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:id
  @Description:function to delete a user
 */
exports.deleteUser = async (id) => {
  try {
    const user = await User.destroy({
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:userData
  @Description:function to update a user data
  */
exports.loginAuth = async (username) => {
  try {
    const user = await User.findOne({ where: { username } });
  return user;
  } catch (err) {
    console.log('user not exist');
  }
};

// getting all Pending requests from blood bank for registration
exports.bloodBankRegisterReq = async (data) => {
  try {
    const regiteredBldBank = await User.findAll({
      where: {
        status: 'deactivate',
      },
    });
    return regiteredBldBank;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:username
  @Description:function to accept blood bank requests.
 */
exports.acceptedRequests = async (id) => {
  try {
    const acceptRequest = await User.update(
      { status: 'active' },
      { where: { id:id } },
    );
    return acceptRequest;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:username
  @Description:function to decline blood bank requests.
 */
exports.declineRequests = async (username) => {
  try {
    const user = await User.destroy({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:name
  @Description:This function find existing blood bank name.
*/
exports.findName = async (name) => {
  try {
    const user = await bloodBank.findOne({ where: { name } });
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:userData
   @Description:This function creates requests for blood by user.
*/
exports.sendRequest = async (userData) => {
  try {
    const request = await action.create(userData);
    return request;
  } catch (err) {
    console.log(err);
  }
};
