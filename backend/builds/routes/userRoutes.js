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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const db_2 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.userRoute = express_1.default.Router();
const JWT_SECRET = "hellowtherethisissundaynight2amisupposedtobesleepingbutiamherewritingcode";
mongoose_1.default.connect("mongodb+srv://anujsidam:BpmiQhJxtry2mA7B@cluster0.mbpg7d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
function generateToken(id) {
    return jsonwebtoken_1.default.sign(id, JWT_SECRET);
}
function userAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['token'];
        try {
            const _id = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const respo = yield db_1.User.findById({
                _id
            });
            if (respo) {
                next();
            }
        }
        catch (err) {
            res.status(411).send(err.message);
        }
    });
}
exports.userRoute.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const resp = yield db_1.User.create({
            username: username,
            password: password
        });
    }
    catch (err) {
        res.status(411).send(err.message);
    }
    res.status(200).send("user Created");
}));
exports.userRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const respo = yield db_1.User.findOne({
        username: username, password: password
    });
    if (respo) {
        yield db_2.Bank.create({
            userId: respo.id, balance: 1 + Math.random() * 10000
        });
        const token = generateToken(respo.id);
        res.send(token);
    }
}));
exports.userRoute.post('/send', userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const token = req.headers['token'];
    const _id = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const senderAccount = yield db_2.Bank.findOne({ userId: _id }).session(session);
    const amount = Number(req.body.amount);
    const username = req.body.username;
    const respo = yield db_1.User.findOne({ username: username }).session(session);
    const reciverId = respo._id;
    if (!_id || senderAccount.balance < amount) {
        yield session.abortTransaction();
        res.status(400).json({ "err": "Insufficient Blanace or Sender Not Found " });
    }
    if (!reciverId) {
        yield session.abortTransaction();
        res.status(400).json({ "msg": "Reciver  Not FOund " });
    }
    yield db_2.Bank.updateOne({ userId: _id }, { $inc: { balance: -amount } }).session(session);
    yield db_2.Bank.updateOne({ userId: reciverId }, { $inc: { balance: amount } }).session(session);
    yield session.commitTransaction();
    res.json({ "msg": "Transaction Succeded !!!! " });
}));
