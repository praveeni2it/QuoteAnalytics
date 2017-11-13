"use strict";

module.exports = function (DeliveryAdderAnalytics) {
  DeliveryAdderAnalytics.remoteMethod(
    "getAdderForYear", {
      http: { path: "/getAdder", verb: "post" },
      accepts: { arg: "reqParams", type: "object", http: {source: "body"} },
      returns: { arg: "deliveryAdder", type: "object" }
    }
  );

  DeliveryAdderAnalytics.getAdderForYear = function (reqParams, getAdderCB) {
    DeliveryAdderAnalytics.findOne({where:{deliveryYear: reqParams.deliveryYear}},
      function (findErr, deliveryAdder) {
      if (findErr) {
        console.log("Error while finding delivery adder", findErr);
        return getAdderCB(findErr);
      }
      return getAdderCB(null, deliveryAdder);
    });
  };
};
