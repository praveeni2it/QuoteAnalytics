'use strict';

module.exports = function(CustomerAdderAnalytics) {
  CustomerAdderAnalytics.getCustomerAdder = function (reqParams, getAdderCB) {
    CustomerAdderAnalytics.findOne({where: {
      customerId: reqParams.customerId,
      productId: reqParams.productId
    }}, function (findErr, customerAdder) {
      if (findErr) {
        console.log("Error while finding customer adder", findErr);
        return getAdderCB(findErr);
      }
      return getAdderCB(null, customerAdder);
    });
  };
};
