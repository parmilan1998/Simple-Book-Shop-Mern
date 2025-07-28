"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, `../../env/.env.${NODE_ENV}`),
});
exports.config = {
    nodeEnv: NODE_ENV,
    port: process.env.PORT || "5000",
    mongoUri: process.env.MONGO_URI || "",
};
