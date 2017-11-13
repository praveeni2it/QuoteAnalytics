"use strict";

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
};
