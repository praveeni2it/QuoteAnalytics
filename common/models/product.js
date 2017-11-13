"use strict";

module.exports = function (Product) {
  Product.remoteMethod(
    "getProductsList", {
      http: { path: "/list", verb: "get" },
      returns: { arg: "products", type: "array" }
    }
  );

  Product.getProductsList = function (getListCB) {
    Product.find(function (findErr, products) {
      if (findErr) {
        console.log("Error while finding all products", findErr);
        return getListCB(findErr);
      }
      return getListCB(null, products);
    });
  };
};
