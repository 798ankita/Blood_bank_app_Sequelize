const db = require('../models/index');

const paymentDetails = db.paymentDetail;

/* @Params:data
   @Description:This function adding data  in bill after sending blood request.
*/
exports.paymentBill = async (data) => {
  try {
    const payment = await paymentDetails.create(data);
    return payment;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:data
   @Description:This function adding data  in bill after sending blood request.
*/
exports.updateAmount = async (id, data) => {
  try {
    const payment = await paymentDetails.update(
      { status: 'approved', total_amount: data },
      {
        where: {
          id,
        },
      },
    );
    return payment;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:id
   @Description:This function find request id in payment table
*/
exports.findReqId = async (attribute) => {
  try {
    const requestId = await paymentDetails.findOne({ where: attribute });
    return requestId;
  } catch (err) {
    console.log(err);
  }
};