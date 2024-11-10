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
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
//////////////////////////// 09 37:50
const DataBase = {
    courses: [
        { id: 1, title: 'front1' },
        { id: 2, title: 'front2' },
        { id: 3, title: 'front3' },
        { id: 4, title: 'front4' },
        { id: 5, title: 'frontend5' },
        { id: 5, title: 'frontend6' },
    ]
};
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUNDED_404: 404,
};
app.get('/', (req, res) => {
    res.json({ message: 'IT-INCUBATOR' });
});
app.get('/samurais', (req, res) => {
    res.send('Hello samurais!!!!');
});
app.post('/samurais', (req, res) => {
    res.send('мы создали самурая');
});
app.get('/courses', (req, res) => {
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
app.get('/courses/:id', (req, res) => {
    const foundCourse = DataBase.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404);
        return;
    }
    res.json(foundCourse);
});
app.post('/courses', (req, res) => {
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
app.delete('/courses/:id', (req, res) => {
    DataBase.courses = DataBase.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(204);
});
app.put('/courses/:id', (req, res) => {
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
app.listen(port, () => {
    console.log(`сайтик стартанул на порте: ${port}`);
});
