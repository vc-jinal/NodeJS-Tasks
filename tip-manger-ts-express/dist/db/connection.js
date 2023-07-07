"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.URL;
console.log(url);
mongoose_1.default.connect(url)
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) => console.error("Error in connecting Database", error));
