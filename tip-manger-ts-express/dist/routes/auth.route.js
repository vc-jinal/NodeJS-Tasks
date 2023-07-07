"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth.controller");
authRouter.post('/signUp', auth_controller_1.signUp);
exports.default = authRouter;
