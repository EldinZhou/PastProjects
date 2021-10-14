
const express = require('express')
const mysql = require('mysql')
const router = require('./router/index')

const app = express()

/*
app.get('/server', (request, response)=>{
    response.setHeader('Access-Control-Allow-Origin','*')
    response.send("Hello Express~!")
})*/

app.use('/',router)

app.listen(8080,()=>{
    console.log("Server is ready for the service!@8080 Port")
})