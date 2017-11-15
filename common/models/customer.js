"use strict";
var async = require("async");

module.exports = function (Customer) {
  Customer.remoteMethod(
    "getCustomersList", {
      http: { path: "/list", verb: "get" },
      returns: { arg: "customers", type: "array" }
    }
  );

  Customer.getCustomersList = function (getListCB) {
    Customer.find(function (findErr, customers) {
      if (findErr) {
        console.log("Error while finding all customers", findErr);
        return getListCB(findErr);
      }
      return getListCB(null, customers);
    });
  };

  Customer.remoteMethod(
    "getAdderForCustomer", {
      http: { path: "/getAdder", verb: "post" },
      accepts: { arg: "reqParams", type: "object", http: {source: "body"} },
      returns: { arg: "customer", type: "object" }
    }
  );

  Customer.getAdderForCustomer = function (reqParams, getAdderCB) {
    var cost = reqParams.cost;
    async.parallel({
      deliveryAdder: Customer.app.models.DeliveryAdderAnalytics.getAdderForYear.bind(null, reqParams),
      customerAdder: Customer.app.models.CustomerAdderAnalytics.getCustomerAdder.bind(null, reqParams),
      customerVariance: Customer.app.models.CustomerVarianceAnalytics.getCustomerVariance.bind(null, reqParams)
    }, function (parallelErr, response) {
      if (parallelErr) {
        console.log("Error while finding adder for customer", parallelErr);
        return getAdderCB(parallelErr);
      }
      var deliveryAdder = (response.deliveryAdder.deliveryAdder * cost) / 100;
      var customerAdder = (response.customerAdder.customerAdder * cost) / 100;
      var customerVariance = (response.customerVariance.customerVariance * cost) / 100;
      var result = {
        deliveryAdder: deliveryAdder,
        customerAdder: customerAdder,
        customerVariance: customerVariance,
        finalPrice: deliveryAdder + customerAdder + customerVariance
      };
      return getAdderCB(null, result);
    });
  };
};
