"use strict";

module.exports = function(CustomerVarianceAnalytics) {
  CustomerVarianceAnalytics.remoteMethod(
    "getCustomerVariance", {
      http: { path: "/getVariance", verb: "post" },
      accepts: { arg: "reqParams", type: "object", http: {source: "body"} },
      returns: { arg: "customerVariance", type: "object" }
    }
  );

  CustomerVarianceAnalytics.getCustomerVariance = function (reqParams, getVarianceCB) {
    CustomerVarianceAnalytics.findOne({where: {
      customerId: reqParams.customerId,
      productId: reqParams.productId
    }}, function (findErr, customerVariance) {
      if (findErr) {
        console.log("Error while finding customer variance", findErr);
        return getVarianceCB(findErr);
      }
      return getVarianceCB(null, customerVariance);
    });
  };
};
