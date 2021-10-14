const express = require('express')
const app = express()

const mysql = require('mysql')
const router = require('./router/index')
const bodyParser = require('body-parser')
const storage = require('./storage')
var hostname = '42.51.15.158'
var port = 8100



//use的定义是有顺序的
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',router)

//console.log(storage)

app.listen(port, hostName, ()=>{
    console.log('42.51.15.158:8100')
})