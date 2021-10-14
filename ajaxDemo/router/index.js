const express = require('express')
const mysql = require("mysql")
const { resolve } = require('path')
const storage = require('../storage')

const router = express.Router()

router.get('/index',async function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*')
    console.log("这是GET")
	/*
	const temp = req.query
    console.log(temp)
	console.log(temp.username+""+temp.password)*/
    let charSrc=''
    const connection = mysql.createConnection(storage.option)
 
    
    connection.connect();
    
    const promise = new Promise(resolve=>{
        connection.query("SELECT * FROM `navigation`", (error, results, fields) =>{
            if (error) {
                throw error
            }
            console.log(results)
            charSrc = JSON.stringify(results)
            resolve(charSrc)
        })
    })
    const resultSrc = await promise
	console.log(resultSrc)
    res.send(resultSrc)
    connection.end()
    next()
})

router.get('/query',async function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*')
    console.log("这是GET")
	/*
	const temp = req.query
    console.log(temp)
	console.log(temp.username+""+temp.password)*/

    const optionQ = {
        host: "localhost",
        user: "root",
        password: "root",
        database: "boyucollections",
        port: '3306',
        connectTimeout: 5000, // 连接超时
    }

    let charSrc=''
    const connection = mysql.createConnection(optionQ)
 
    
    connection.connect();
    
    const promise = new Promise(resolve=>{
        connection.query("SELECT * FROM `screwlist`", (error, results, fields) =>{
            if (error) {
                throw error
            }
            console.log(results)
            charSrc = JSON.stringify(results)
            resolve(charSrc)
        })
    })
    const resultSrc = await promise
	console.log(resultSrc)
    res.send(resultSrc)
    connection.end()
    next()
})


module.exports = router
