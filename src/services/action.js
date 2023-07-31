const db = require("../models/index");
const action = db.action;

 /*@Params:id
  @Description:function to cancel the request.
 */
  exports.cancelRequestForBld =  async (id) =>
  {
    try {
      const request = await action.update({status:"cancelled"},
      {where:{ id : id }});
      return request ;
    } catch (err) {
      console.log(err);
    }
  };

 /* @Params:id,data
   @Description:This function find request by id.
*/
exports.findId = async (id) => {
    try {
      const requestId = await action.findOne({ where: {id:id } });
      return requestId;
    } 
    catch (err) {
    throw err;
    }
  };

/*@Params:usersData
  @Description:function to get all requests data
*/
exports.allRequests = async (data) => {
  try {
    const users = await action.findAll({});
    return users;
  } catch (err) {
    throw err;
  }
};

/*@Params:username
  @Description:function to accept blood requests created by user.
 */
  exports.acceptBloodRequest =  async (username) =>
  {
    try {
      const acceptRequest = await action.update({status:"accepted"},
      {where:{ username : username }});
      return acceptRequest ;
    } catch (err) {
      console.log(err);
    }
  };
