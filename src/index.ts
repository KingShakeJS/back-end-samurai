// const express = require('express')
import express from 'express'
const tls = require("tls");
const app = express()
const port = 3003

//////////////////////////// 09
app.get('/', (req:any, res:any) => {
    const a =4
    if (a>5){
        res.send("a>5")
    }else {
        res.send("!a>5")

    }
})
app.get('/samurais', (req, res) => {
    res.send('Hello samurais!!!!')
})
app.post('/samurais', (req, res) => {
    res.send('мы создали самурая')
})

app.listen(port, () => {
    console.log(`сайтик стартанул на порте: ${port}`)
})