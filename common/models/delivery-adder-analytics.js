"use strict";

module.exports = function (DeliveryAdderAnalytics) {
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
