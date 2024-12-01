"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// const express = require('express')
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// const tls = require("tls");
exports.app = (0, express_1.default)();
const port = 3003;
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
exports.app.use((0, cors_1.default)());
exports.app.use((0, body_parser_1.default)());
//////////////////////////// 14
const DataBase = {
    courses: [
        { id: 1, title: 'front1' },
        { id: 2, title: 'front2' },
        { id: 3, title: 'front3' },
        { id: 4, title: 'front4' },
        { id: 5, title: 'frontend5' },
        { id: 6, title: 'frontend6' },
    ],
    products: [
        { id: 1, title: 'tomato1' },
        { id: 2, title: 'tomato2' },
        { id: 3, title: 'tomato3' },
        { id: 4, title: 'tomato4' },
        { id: 5, title: 'tomato5' },
        { id: 5, title: 'ddddd' },
    ],
    addresses: [
        { id: 1, value: 'address1' },
        { id: 2, value: 'address2' },
        { id: 3, value: 'address3' },
    ]
};
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUNDED_404: 404,
};
exports.app.get('/', (req, res) => {
    res.json({ message: 'IT-INCUBATOR' });
});
exports.app.get('/samurais', (req, res) => {
    res.send('Hello samurais!!!!');
});
exports.app.post('/samurais', (req, res) => {
    res.send('мы создали самурая');
});
exports.app.get('/courses', (req, res) => {
    let foundCourses = DataBase.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1);
    }
    // if (!foundCourses.length) {
    //     res.sendStatus(404)
    //     return
    // }
    res.json(foundCourses);
});
exports.app.get('/courses/:id', (req, res) => {
    const foundCourse = DataBase.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
        return;
    }
    res.json(foundCourse);
});
exports.app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    };
    DataBase.courses.push(createdCourse);
    res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
});
exports.app.post('/products', (req, res) => {
    if (!req.body.title) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send('не вышло');
        return;
    }
    const product = {
        id: +(new Date()),
        title: req.body.title
    };
    DataBase.products.push(product);
    res.status(HTTP_STATUSES.CREATED_201).json(product);
});
exports.app.delete('/courses/:id', (req, res) => {
    DataBase.courses = DataBase.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(204);
});
exports.app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
        return;
    }
    const foundCourse = DataBase.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
        return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.get(`/products`, (req, res) => {
    let searchString = req.query.title;
    if (searchString) {
        let search = searchString.toString();
        res.send(DataBase.products.filter(p => p.title.indexOf(search) > -1));
    }
    res.send(DataBase.products);
});
exports.app.get(`/products/:id`, (req, res) => {
    let product = DataBase.products.find(p => p.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
        return;
    }
});
exports.app.delete(`/products/:id`, (req, res) => {
    for (let i = 0; i < DataBase.products.length; i++) {
        if (DataBase.products[i].id === +req.params.id) {
            DataBase.products.splice(i, 1);
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
            return;
        }
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
});
exports.app.get('/addresses', (req, res) => {
    res.status(HTTP_STATUSES.OK_200).json(DataBase.addresses);
});
exports.app.get('/addresses/:id', (req, res) => {
    const address = DataBase.addresses.find(a => a.id === +req.params.id);
    if (address) {
        res.status(HTTP_STATUSES.OK_200).json(address);
    }
    else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
    }
});
exports.app.put('/products/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
        return;
    }
    const foundProduct = DataBase.products.find(c => c.id === +req.params.id);
    if (!foundProduct) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
        return;
    }
    foundProduct.title = req.body.title;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log(`сайтик стартанул на порте: ${port}`);
});
