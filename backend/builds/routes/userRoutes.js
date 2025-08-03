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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.userRoute = express_1.default.Router();
const JWT_SECRET = "hellowtherethisissundaynight2amisupposedtobesleepingbutiamherewritingcode";
mongoose_1.default.connect("mongodb+srv://anujsidam:BpmiQhJxtry2mA7B@cluster0.mbpg7d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
function generateToken(id) {
    return jsonwebtoken_1.default.sign(id, JWT_SECRET);
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
        res.status(400).send(err.message);
    }
    res.send("user Created");
}));
exports.userRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const respo = yield db_1.User.findOne({
        username: username, password: password
    });
    if (respo) {
        const token = generateToken(respo.id);
        res.json({ "token": token });
    }
}));
