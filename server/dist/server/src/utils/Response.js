"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonResponse = /** @class */ (function () {
    function JsonResponse(res) {
        this.res = res;
    }
    JsonResponse.prototype.success = function (data, message) {
        if (data === void 0) { data = {}; }
        if (message === void 0) { message = "sucess"; }
        this.res.status(200).json({
            error: false,
            status: 200,
            data: data,
            message: message
        });
    };
    JsonResponse.prototype.serverError = function () {
        this.res.status(200).json({
            error: true,
            status: 500,
            data: {},
            message: "Internal Server Error"
        });
    };
    JsonResponse.prototype.notFound = function (message) {
        this.res.status(200).json({
            error: true,
            status: 404,
            data: {},
            message: message
        });
    };
    JsonResponse.prototype.notAuthorized = function (message) {
        if (message === void 0) { message = "Not authorized"; }
        this.res.status(200).json({
            error: true,
            status: 401,
            data: null,
            message: message
        });
    };
    JsonResponse.prototype.clientError = function (message, data) {
        if (data === void 0) { data = null; }
        this.res.status(200).json({
            error: true,
            status: 400,
            data: data,
            message: message
        });
    };
    return JsonResponse;
}());
exports.default = JsonResponse;
