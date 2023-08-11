const db = require('../models/index');
const { action } = db;

/* @Params:id
  @Description:function to cancel the request.
 */
exports.cancelRequestForBld = async (id) => {
  try {
    const request = await action.update(
      { status: 'cancelled' },
      { where: { id } },
    );
    return request;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:id
   @Description:This function find request by id
*/
exports.findRequestId = async (attribute) => {
  try {
    const requestId = await action.findOne({ where: attribute });
    return requestId;
  } catch (err) {
    console.log(err);
  }
};


/* @Params:id,data
  @Description:function to get all requests data by bloodbank id
*/
exports.findRequests = async (attribute) => {
  try {
    const users = await action.findAll({ where: attribute });
    return users;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:id
  @Description:function to accept blood requests created by user.
 */
exports.acceptBloodRequest = async (id) => {
  try {
    const acceptRequest = await action.update(
      { status: 'approved' },
      { where: { id } },
    );
    return acceptRequest;
  } catch (err) {
    console.log(err);
  }
};
