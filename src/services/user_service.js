const db = require("../models/index");
const User = db.user;
// const superUser = db.superUser;
const sequelize = db.sequelize;

/* @Params:userData
   @Description:This function creates users
*/
exports.postUsers = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (err) {
    throw err;
  }
};

/* @Params:superUserData
   @Description:This function creates superuser
*/
exports.postsuperUsers = async (userData) => {
  try {
    const user = await superUser.create(userData);
    return user;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:userMail
   @Description:This function find existing user with email
*/
exports.checkEmail = async (userMail) => {
    try {
      const user = await User.findOne({ where: { email:userMail } });
      return user;
    } 
    catch (err) {
    throw err;
    }
  };

/*@Params:username
  @Description:This function find existing user with username
*/
exports.checkUsername = async (username) => {
  try {
    const user = await User.findOne({ where: {username:username } });
    return user;
  } 
  catch (err) {
  throw err;
  }
};

/*@Params:username
  @Description:This function find existing user's id
*/
exports.userId = async(id) => {
  try {
    const user = await User.findOne({ where: {id:id} });
    return user;
  } 

  catch (err) {
  throw err;
  }
};

/*@Params:usersData
  @Description:function to get all users data
*/
exports.getUsers = async (usersData) => {
  try {
    const users = await User.findAll({});
    return users;
  } catch (err) {
    throw err;
  }
};

/*@Params:userData
  @Description:function to get one user data
  */
exports.getUser = async (id) => {
  try {
    const user = await User.findOne(data,{
      where:{
        id:id
      }    
    });
    return user;
  } 
  catch (err) {
  throw err;
  }
};

/*@Params:userData
  @Description:function to update a user data
  */
exports.updateUser = async (id,data) => {
  try {
    const user = await User.update(data,{
      where:{
        id:id 
      }    
  });
    return user;
  } 
   catch (err) {
   throw err;
   }
};

/*@Params:id
  @Description:function to delete a user
 */
  exports.deleteUser = async (id) => {
    try {
      const user = await User.destroy({
        where:{
          id:id
        }
      });
      return user;
    } 
    catch (err) {
    throw err;
    }
  };

  /*@Params:userData
  @Description:function to update a user data
  */
exports.loginAuth = async (username) => {
  try {
    const user = await User.findOne({ where: { username: username }})
    return user;
  }
   catch (err) {
   console.log("user not exist")
   }
  };

// getting all Pending requests from blood bank for registration
  exports.bloodBankRegisterReq = async() =>
  {
    try {
      const regiteredBldBank = await User.findAll({
        where:{
          status:"deactivate"
        }
      });
      return regiteredBldBank ;
    } catch (err) {
      throw err;
    }
  };

  //
  exports.acceptedRequests =  async (id) =>
  {
    try {
      const regiteredBldBank = await User.update({status:"active"},{where:{id:id}});
      return regiteredBldBank ;
    } catch (err) {
      console.log(err);
    }
  };
  
  
