"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateByPeriod = void 0;
var getDateByPeriod = function (time_period) {
    try {
        var dateData = new Date();
        switch (time_period) {
            case "WEEK":
                dateData.setDate(dateData.getDate() - 7);
                return dateData;
            case "MONTH":
                dateData.setMonth(dateData.getDate());
        }
    }
    catch (error) {
    }
};
exports.getDateByPeriod = getDateByPeriod;
