"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const tls = require("tls");
const app = (0, express_1.default)();
const port = 3003;
//////////////////////////// 09
app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send("a>5");
    }
    else {
        res.send("!a>5");
    }
});
app.get('/samurais', (req, res) => {
    res.send('Hello samurais!!!!');
});
app.post('/samurais', (req, res) => {
    res.send('мы создали самурая');
});
app.listen(port, () => {
    console.log(`сайтик стартанул на порте: ${port}`);
});
