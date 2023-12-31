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
    throw(err);
  }
};

/* @Params:attribute
   @Description:This function find existing user 
*/
exports.findUser = async (attribute) => {
  try {
    const user = await User.findOne({ where: attribute });
    return user;
  } catch (err) {
    throw(err);
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
    throw(err);
  }
};

/* @Params:userData
  @Description:function to update a user data
  */
exports.updateUser = async (id, data) => {
  try {
    const user = await User.update(data, {
      where: {
        id:id
      },
    });
    return user;
  } catch (err) {
    throw(err);
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
    throw(err);
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
    throw(err);
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
    throw(err);
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
    throw(err);
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
    throw(err);
  }
};
