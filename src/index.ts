// const express = require('express')

// следующий урок 15

import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {ReqWithBody, ReqWithParams, ReqWithParamsAndBody, ReqWithQuery} from "../types";
import {CourseCreateModel} from "./models/CourseCreateModel";
import {CourseUpdateModel} from "./models/CourseUpdateModel";
import {GetCoursesQueryModel} from "./models/GetCoursesQueryModel";
import {CourseViewModel} from "./models/CourseViewModel";
import {URIParamsCourseIdModel} from "./models/URIParamsCourseIdModel";


// const tls = require("tls");
export const app = express()
const port = 3003
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)
app.use(cors())
app.use(bodyParser())

type CourseType = {
    id: number
    title: string
    studentsCount: number
}
type DataBaseTypes = {
    courses: CourseType[]
}
const DataBase: DataBaseTypes = {
    courses: [
        {id: 1, title: 'front1', studentsCount: 1},
        {id: 2, title: 'front2', studentsCount: 1},
        {id: 3, title: 'front3', studentsCount: 1},
        {id: 4, title: 'front4', studentsCount: 1},
        {id: 5, title: 'frontend5', studentsCount: 1},
        {id: 6, title: 'frontend6', studentsCount: 1},
    ],

}

const getCourseViewModel = (course: CourseType): CourseViewModel => {
    return {
        id: course.id,
        title: course.title
    }
}

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUNDED_404: 404,

}
app.get('/', (req: Request, res: Response) => {
    res.json({message: 'IT-INCUBATOR'})
})

app.get('/courses', (req: ReqWithQuery<GetCoursesQueryModel>,
                     res: Response<CourseViewModel[]>) => {
    let foundCourses = DataBase.courses
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1)
    }

    res.json(foundCourses.map(DBCourse => {
        return getCourseViewModel(DBCourse)
    }))
})
app.get('/courses/:id', (req: ReqWithParams<URIParamsCourseIdModel>,
                         res: Response<CourseViewModel>) => {
    const foundCourse = DataBase.courses.find(c => c.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404)
        return
    }
    res.json(getCourseViewModel(foundCourse))
})

app.post('/courses', (req: ReqWithBody<CourseCreateModel>,
                      res: Response<CourseViewModel>) => {

    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }

    const createdCourse: CourseType = {
        id: +(new Date()),
        title: req.body.title,
        studentsCount: 3
    }
    DataBase.courses.push(createdCourse)
    res.status(HTTP_STATUSES.CREATED_201).json(getCourseViewModel(createdCourse))
})

app.delete('/courses/:id', (req: ReqWithParams<URIParamsCourseIdModel>, res) => {
    DataBase.courses = DataBase.courses.filter(c => c.id !== +req.params.id)

    res.sendStatus(204)
})

app.put('/courses/:id', (req: ReqWithParamsAndBody<{ id: string }, CourseUpdateModel>, res: Response) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    const foundCourse = DataBase.courses.find(c => c.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404)
        return
    }

    foundCourse.title = req.body.title

    res.sendStatus(HTTP_STATUSES.OK_200)
})


app.delete('/__test__/data', (req, res) => {
    DataBase.courses = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.listen(port, () => {
    console.log(`сайтик стартанул на порте: ${port}`)
})