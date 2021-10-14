const express = require('express')
const http = require('http')
const mysql = require("mysql")
const { resolve } = require('path')
const storage = require('../storage')
const hostname = '42.51.15.158'

const router = express.Router()

router.post('/inquire',(req,res,next)=>{
    res.send("成功收到！")
    console.log("这是POST")

    const data = req.body
    const option1 = {
        host: hostname,
        user: "root",
        password: "59c3176040eacd38",
        database: "taskcollections",
        port: '3306',
        connectTimeout: 5000, // 连接超时
      }
    //console.log(data)
    const connection = mysql.createConnection(option1)
    connection.connect()
    let addSql = "insert into tasklist (nickname,sendername,time,name,message,flag,startCor,indexArray) values (?,?,?,?,?,?,?,?)"
    let addSqlParams = [data.nickname,data.sendername,data.time,data.name,data.message,data.flag,data.startCor,data.indexArray]

    connection.query(addSql, addSqlParams, (err, results) => {
        if (err) {
            throw err;
        }
        // 插入成功输出
        console.log('插入成功');
        //console.log(results);
    })
    //结束连接
    connection.end()
    next()
})

router.get('/start',async function(req,res,next){
    
    console.log("这是GET")
    
    let charSrc=''

    currentName = req.query.username
    
    const option2 = {
        host: hostname,
        user: "root",
        password: "59c3176040eacd38",
        database: "taskcollections",
        port: '3306',
        connectTimeout: 5000, // 连接超时
      }
    //console.log(data)
    const connection = mysql.createConnection(option2)
    
    connection.connect();
    
    const promise = new Promise(resolve=>{
        connection.query('SELECT * FROM `tasklist`', (error, results, fields) =>{
            if (error) {
                throw error
            }
            //console.log(results)
            charSrc = JSON.stringify(results)
            resolve(charSrc)
        })
    })
    const resultSrc = await promise
    res.send(resultSrc)
    connection.end()
    next()
})

router.get('/detect',(req,res,next)=>{
    res.send("成功收到！")
    console.log("GET2")

    const data = req.query
    console.log(data)
    const option3 = {
        host: hostname,
        user: "root",
        password: "59c3176040eacd38",
        database: "transactioncollections",
        port: '3306',
        connectTimeout: 5000, // 连接超时
      }
    //console.log(data)
    const connection = mysql.createConnection(option3)
    connection.connect()
    let addSql = "insert into translist (senderName,rcvName,taskID,senderNick,rcvNick,reward,startName,feedback,status,expireTime,navLngLat) values (?,?,?,?,?,?,?,?,?,?,?)"
    let addSqlParams = [data.senderName,data.rcvName,data.taskID,data.senderNick,data.rcvNick,data.reward,data.startName,data.feedback,data.status,data.expireTime,data.navLngLat]

    connection.query(addSql, addSqlParams, (err, results) => {
        if (err) {
            throw err;
        }
        // 插入成功输出
        console.log('插入成功');
        //console.log(results);
    })
    //结束连接
    connection.end()
    next()
})

router.get('/show',async function(req,res,next){
    
    console.log("这是GET")
    
    let charSrc=''

    currentName = req.query.username
    
    const option4 = {
        host: hostname,
        user: "root",
        password: "59c3176040eacd38",
        database: "transactioncollections",
        port: '3306',
        connectTimeout: 5000, // 连接超时
      }
    //console.log(data)
    const connection = mysql.createConnection(option4)
    
    connection.connect();
    
    const promise = new Promise(resolve=>{
        connection.query('SELECT * FROM `translist`', (error, results, fields) =>{
            if (error) {
                throw error
            }
            //console.log(results)
            charSrc = JSON.stringify(results)
            resolve(charSrc)
        })
    })
    const resultSrc = await promise
    res.send(resultSrc)
    connection.end()
    next()
})


router.get('/statusChange',(req,res,next)=>{
    res.send("成功收到！")
    console.log("GET3")

    const data = req.query
    console.log(data)
    const option3 = {
        host: hostname,
        user: "root",
        password: "59c3176040eacd38",
        database: "taskcollections",
        port: '3306',
        connectTimeout: 5000, // 连接超时
      }
    //console.log(data)
    const connection = mysql.createConnection(option3)
    connection.connect()
    let updateSql = " update tasklist set flag = '0' where taskID = "+data.selectedTaskID+" "
    
    connection.query(updateSql, (err, results) => {
        if (err) {
            throw err;
        }
        // 插入成功输出
        console.log('插入成功');
        //console.log(results);
    })
    //结束连接
    connection.end()
    next()
})

router.get('/userInfo',(req,res,next)=>{
    res.send("成功收到！")
    console.log("GET4")

    const data = req.query
    console.log(data)
    const option3 = {
        host: hostname,
        user: "root",
        password: "59c3176040eacd38",
        database: "usercollections",
        port: '3306',
        connectTimeout: 5000, // 连接超时
      }
    //console.log(data)
    const connection = mysql.createConnection(option3)
    connection.connect()
    let usernameStr = JSON.stringify(data.username)
    let updateSql = " update userlist set platformCoins = "+data.platformCoins+" where username="+usernameStr+" "

    connection.query(updateSql, (err, results) => {
        if (err) {
            throw err;
        }
        // 插入成功输出
        console.log('插入成功');
        //console.log(results);
    })
    //结束连接
    connection.end()
    next()
})

router.get('/msgRegister',(req,res,next)=>{
    res.send("成功收到！")
    console.log("GET5")

    const data = req.query
    console.log(data)
    const option3 = {
        host: hostname,
        user: "root",
        password: "59c3176040eacd38",
        database: "msgcollections",
        port: '3306',
        connectTimeout: 5000, // 连接超时
      }
    //console.log(data)
    const connection = mysql.createConnection(option3)
    connection.connect()
    let addSql = "insert into msglist (username,rcvname,senderNick,rcvNick) values (?,?,?,?)"
    let addSqlParams = [data.username,data.rcvname,data.sendernick,data.rcvnick]

    connection.query(addSql, addSqlParams, (err, results) => {
        if (err) {
            throw err;
        }
        // 插入成功输出
        console.log('插入成功');
        //console.log(results);
    })
    //结束连接
    connection.end()
    next()
})

router.get('/msgShow',async function(req,res,next){
    
    console.log("这是GET")
    
    let charSrc=''

    currentName = req.query.username
    
    const option8 = {
        host: hostname,
        user: "root",
        password: "59c3176040eacd38",
        database: "msgcollections",
        port: '3306',
        connectTimeout: 5000, // 连接超时
      }
    //console.log(data)
    const connection = mysql.createConnection(option8)
    
    connection.connect();
    
    const promise = new Promise(resolve=>{
        connection.query('SELECT * FROM `msglist`', (error, results, fields) =>{
            if (error) {
                throw error
            }
            //console.log(results)
            charSrc = JSON.stringify(results)
            resolve(charSrc)
        })
    })
    const resultSrc = await promise
    res.send(resultSrc)
    connection.end()
    next()
})

module.exports = router