const db = require('../models/index');
const { bloodInventory } = db;

/* @Params:data
   @Description:This function adding details to blood Inventory table.
*/
exports.addInventory = async (data) => {
  try {
    const detail = await bloodInventory.create(data);
    return detail;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:id
  @Description:This function to check blood availability
*/
exports.findInventory = async (attribute) => {
  try {
    const data = await bloodInventory.findOne({ where: attribute });
    return data;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:id,data
  @Description:function to update blood Inventory units.
  */
exports.updateInventory = async (id, data) => {
  try {
    const detail = await bloodInventory.update(data, {
      where: {
        id,
      },
    });
    return detail;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:bloodId, data
  @Description:function to update blood Inventory units automaticaly.
  */
exports.updateAutoInventory = async (bloodId, data) => {
  try {
    const change = await bloodInventory.update(data, {
      where: {
        bloodBankId: bloodId,
      },
    });
    return change;
  } catch (err) {
    console.log(err);
  }
};

/* @Params:bloodId, data
  @Description:function to update blood Inventory units automaticaly when donation complete.
  */
exports.inventoryUpdateDonation = async (bloodId, data) => {
  try {
    const change = await bloodInventory.update({ data, status: 'donation Complete' }, {
      where: {
        bloodBankId: bloodId,
      },
    });
    return change;
  } catch (err) {
    console.log(err);
  }
};
