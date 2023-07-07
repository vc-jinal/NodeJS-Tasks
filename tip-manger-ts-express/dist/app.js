"use strict";
// import express,{Express} from 'express';
// import indexRouter from './routes/index.route';
// // import {  } from "../src/db/connection.js";
// const app:Express=express();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.use(express.json())
// // app.use('/api',indexRouter);
// app.listen(3000,()=>console.log("App is running on 3000"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
