// const express = require('express')

// следующий урок 15

import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";


// const tls = require("tls");
export const app = express()
const port = 3003
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)
app.use(cors())
app.use(bodyParser())
//////////////////////////// 14

const DataBase = {
    courses: [
        {id: 1, title: 'front1'},
        {id: 2, title: 'front2'},
        {id: 3, title: 'front3'},
        {id: 4, title: 'front4'},
        {id: 5, title: 'frontend5'},
        {id: 6, title: 'frontend6'},
    ],
    products: [
        {id: 1, title: 'tomato1'},
        {id: 2, title: 'tomato2'},
        {id: 3, title: 'tomato3'},
        {id: 4, title: 'tomato4'},
        {id: 5, title: 'tomato5'},
        {id: 5, title: 'ddddd'},
    ],
    addresses: [
        {id: 1, value: 'address1'},
        {id: 2, value: 'address2'},
        {id: 3, value: 'address3'},
    ]
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
app.get('/samurais', (req: Request, res: Response) => {
    res.send('Hello samurais!!!!')
})
app.post('/samurais', (req: Request, res: Response) => {
    res.send('мы создали самурая')
})
app.get('/courses', (req: Request, res: Response) => {
    let foundCourses = DataBase.courses
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1)
    }
    // if (!foundCourses.length) {
    //     res.sendStatus(404)
    //     return
    // }
    res.json(foundCourses)


})
app.get('/courses/:id', (req: Request, res: Response) => {
    const foundCourse = DataBase.courses.find(c => c.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404)
        return
    }
    res.json(foundCourse)
})

app.post('/courses', (req: Request, res: Response) => {

    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }

    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    }
    DataBase.courses.push(createdCourse)
    res.status(HTTP_STATUSES.CREATED_201).json(createdCourse)
})
app.post('/products', (req: Request, res: Response) => {

    if (!req.body.title) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send('не вышло')
        return
    }


    const product = {
        id: +(new Date()),
        title: req.body.title
    }
    DataBase.products.push(product)
    res.status(HTTP_STATUSES.CREATED_201).json(product)
})
app.delete('/courses/:id', (req, res) => {
    DataBase.courses = DataBase.courses.filter(c => c.id !== +req.params.id)

    res.sendStatus(204)
})

app.put('/courses/:id', (req: Request, res: Response) => {
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

app.get(`/products`, (req: Request, res: Response) => {

    let searchString = req.query.title
    if (searchString) {
        let search = searchString.toString()
        res.send(DataBase.products.filter(p => p.title.indexOf(search) > -1))
    }
    res.send(DataBase.products)
})
app.get(`/products/:id`, (req: Request, res: Response) => {
    let product = DataBase.products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404)
        return
    }

})
app.delete(`/products/:id`, (req: Request, res: Response) => {
    for (let i = 0; i < DataBase.products.length; i++) {
        if (DataBase.products[i].id === +req.params.id) {
            DataBase.products.splice(i, 1)
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
            return
        }
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404)
})
app.get('/addresses', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).json(DataBase.addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = DataBase.addresses.find(a => a.id === +req.params.id)
    if (address) {
        res.status(HTTP_STATUSES.OK_200).json(address)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404)
    }
})
app.put('/products/:id', (req: Request, res: Response) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404)
        return
    }
    const foundProduct = DataBase.products.find(c => c.id === +req.params.id);

    if (!foundProduct) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUNDED_404)
        return
    }

    foundProduct.title = req.body.title

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
app.delete('/__test__/data', (req, res)=>{
    DataBase.courses = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.listen(port, () => {
    console.log(`сайтик стартанул на порте: ${port}`)
})