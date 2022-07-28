"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var app_1 = require("firebase/app");
var serviceAccount = __importStar(require("./serviceAccountKey.json"));
var params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
};
var firebaseConfig = {
    apiKey: "AIzaSyCw3IImYYhTOMy2sJ9PZk1AoJuXhr8FXcA",
    authDomain: "dateapp-1e651.firebaseapp.com",
    projectId: "dateapp-1e651",
    storageBucket: "dateapp-1e651.appspot.com",
    messagingSenderId: "508221626056",
    appId: "1:508221626056:web:1d29a2ddcd51ad14d9b7fd"
};
// firebase.initializeApp(firebaseConfig);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(params),
    storageBucket: "school-app-75ab0.appspot.com"
});
var app = app_1.initializeApp(firebaseConfig);
exports.app = app;
