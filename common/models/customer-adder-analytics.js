'use strict';

module.exports = function(CustomerAdderAnalytics) {
  CustomerAdderAnalytics.remoteMethod(
    "getCustomerAdder", {
      http: { path: "/getAdder", verb: "post" },
      accepts: { arg: "reqParams", type: "object", http: {source: "body"} },
      returns: { arg: "customerAdder", type: "object" }
    }
  );

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
