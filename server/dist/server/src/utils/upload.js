"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.cropPicture = exports.uploadFile = void 0;
var multer_1 = __importDefault(require("multer"));
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var sharp_1 = __importDefault(require("sharp"));
var idgen_1 = require("./idgen");
var storage = multer_1.default.memoryStorage();
var st = firebase_admin_1.default.storage();
var upload = multer_1.default({
    storage: storage,
    fileFilter: function (req, file, cb) {
        //if (mimeTypes.includes(file.mimetype)) {
        return cb(null, true);
        //}
        //cb('File type not allowed', false);
    }
}).any();
exports.upload = upload;
function getUrl(fileName) {
    var file = st.bucket().file(fileName);
    var url = file.publicUrl();
    return url;
}
function removeFile(dir) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, st.bucket().deleteFiles({ prefix: dir })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, err_1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function uploadFile(_a) {
    var buffer = _a.buffer, dir = _a.dir, _b = _a.replace, replace = _b === void 0 ? true : _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c, filename, blob, blobStream;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = replace;
                    if (!_c) return [3 /*break*/, 2];
                    return [4 /*yield*/, removeFile(dir)];
                case 1:
                    _c = (_d.sent());
                    _d.label = 2;
                case 2:
                    _c;
                    filename = replace ? dir + idgen_1.makeId() : dir;
                    blob = st.bucket().file(filename);
                    blobStream = blob.createWriteStream();
                    return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                blobStream.on("error", function (err) {
                                    console.log(err);
                                    rej("");
                                });
                                blobStream.on("finish", function () { return __awaiter(_this, void 0, void 0, function () {
                                    var public_url;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, st.bucket().file(filename).makePublic()];
                                            case 1:
                                                _a.sent();
                                                public_url = getUrl(filename);
                                                res(public_url);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                blobStream.end(buffer);
                                return [2 /*return*/];
                            });
                        }); })];
            }
        });
    });
}
exports.uploadFile = uploadFile;
function cropPicture(buffer, vals, resize) {
    var _a, _b, _c, _d;
    if (resize === void 0) { resize = [1200, 2133]; }
    return __awaiter(this, void 0, void 0, function () {
        var cropInfo, meta, imgBuffer;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    cropInfo = {
                        left: parseFloat((_a = vals.x) !== null && _a !== void 0 ? _a : "0"),
                        top: parseFloat((_b = vals.y) !== null && _b !== void 0 ? _b : "0"),
                        width: parseFloat((_c = vals.width) !== null && _c !== void 0 ? _c : "0"),
                        height: parseFloat((_d = vals.height) !== null && _d !== void 0 ? _d : "0"),
                    };
                    return [4 /*yield*/, sharp_1.default(buffer).metadata()];
                case 1:
                    meta = _e.sent();
                    if (!meta.height || !meta.width)
                        throw new Error("invalid metadata");
                    cropInfo.top = Math.round((cropInfo.top / 100) * meta.height);
                    cropInfo.left = Math.round((cropInfo.left / 100) * meta.width);
                    cropInfo.width = Math.round((cropInfo.width / 100) * meta.width);
                    cropInfo.height = Math.round((cropInfo.height / 100) * meta.height);
                    return [4 /*yield*/, sharp_1.default(buffer).extract(cropInfo).resize(resize[0], resize[1]).jpeg().toBuffer()];
                case 2:
                    imgBuffer = _e.sent();
                    return [2 /*return*/, imgBuffer];
            }
        });
    });
}
exports.cropPicture = cropPicture;
