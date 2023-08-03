const db = require("../models/index");
const paymentDetails = db.paymentDetail;

/* @Params:data
   @Description:This function adding data  in bill after sending blood request.
*/
exports.paymentBill = async (data) => {
    try {
      const payment = await paymentDetails.create(data);
      return payment;
    } 
    catch (err) {
      console.log(err);
    }
  };
  