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
//apps
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var socket_io_1 = require("socket.io");
var path_1 = __importDefault(require("path"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var notificationHandler_1 = __importDefault(require("./handler/notificationHandler"));
require("./fire");
//middlewares
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var routes_1 = require("./routes");
var secret_1 = require("./secret");
//constants
var CONNECTION_URL = "mongodb+srv://Classital:ofhlUSsqYXioMRXM@cluster0.vyegx.mongodb.net/Schoolapp?retryWrites=true&w=majority";
//const CONNECTION_URL = "mongodb+srv://cluster0.vyegx.mongodb.net/myFirstDatabase"
var PORT = process.env.PORT || 5000;
//app
var app = express_1.default();
//using middlewares
app.use(body_parser_1.default.json());
app.use(cors_1.default({ credentials: true, origin: true }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join("build")));
//api
app.use("/api", routes_1.ApiRoutes);
app.get("/*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "..", "build", "index.html"));
});
//init app
function _INIT_() {
    return __awaiter(this, void 0, void 0, function () {
        var server, io;
        return __generator(this, function (_a) {
            server = app.listen(PORT, function () {
                console.log("listening on port " + PORT + "...");
            });
            io = new socket_io_1.Server(server);
            app.locals.notification = new notificationHandler_1.default(io);
            io.use(function (socket, next) {
                try {
                    var token = socket.handshake.query.token;
                    if (!token)
                        return next(new Error("Not Authorized"));
                    ;
                    var user = jsonwebtoken_1.default.verify(token, secret_1.USER_PASSWORD_SECRET);
                    if (!user)
                        return next(new Error("Not Authorized"));
                    socket.user_id = user.user_id;
                    return next();
                }
                catch (error) {
                    console.log(error);
                    return;
                }
            }).on("connection", function (socket) {
                socket.join(socket.user_id);
                // console.log("user connected " + socket.user_id)
            });
            return [2 /*return*/];
        });
    });
}
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: false
};
mongoose_1.default.connect(CONNECTION_URL, {}).then(_INIT_);
