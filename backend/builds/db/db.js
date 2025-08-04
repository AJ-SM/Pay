"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 13
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 12,
        required: true,
    }
});
const BankSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    balance: {
        type: Number,
        required: true
    }
});
exports.User = mongoose_1.default.model('users', userSchema);
exports.Bank = mongoose_1.default.model('bank', BankSchema);
