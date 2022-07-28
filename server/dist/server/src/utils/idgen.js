"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeId = exports.uid = void 0;
function uid(length) {
    var result = '';
    var characters = 'AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHHIIIIJJJJKKKKLLLLMMMMNNNNOOOOPPPPQQQQRRRRSSSSTTTTUUUUVVVVWWWWXXXXYYYYZZZZaaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnnooopppqqqrrrssstttuuuvvvwwwxxxyyyzzz__--1234567890';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.uid = uid;
function makeId() {
    return (Math.floor(Math.random() * Math.pow(10, 15))).toString(16);
}
exports.makeId = makeId;
