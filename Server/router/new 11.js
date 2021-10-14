var sd = require('silly-datetime');
var http = require('http')
var WebSocketServer = require('websocket').server
var util = require('util')
var querystring = require('querystring')
const mysql = require("mysql")
const hostname = '42.51.15.158';
const port = 3030;
var testNow = "";
var testSender = "";
var testReceiver = "";
var dataCollections = []
var indexLatest = 0
var lengthLatest = 0

const httpServer = http.createServer((request, response) => {
  console.log('[' + new Date + '] Received request for ' + request.url)
  let data = []
  // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    request.on('data', function(chunk){    
        post += chunk;
    })
    
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    request.on('end', function(){  
        resdata = JSON.parse(post);
        
	    //console.log(resdata);
	    console.log(resdata.list)
	    lengthLatest = resdata.list.length
	    
	    dataCollections = resdata.list
	    //console.log("用户发的是: "+resdata.list[lengthLatest].content)
	    //console.log("用户的身份是: "+resdata.list[lengthLatest].role)
	    console.log("最新的索引是: "+indexLatest)
	    console.log(lengthLatest)
	    var uploadData = dataCollections[lengthLatest-1]
	    console.log(uploadData)
	    
	    const option3 = {
            host: "42.51.15.158",
            user: "root",
            password: "59c3176040eacd38",
            database: "chatCollections",
            port: '3306',
            connectTimeout: 5000, // 连接超时
        }
        //console.log(data)
        const connection = mysql.createConnection(option3)
        connection.connect()
        if(uploadData){
            let addSql = "insert into chatlist (sender,receiver,role,content,tempID) values (?,?,?,?,?)"
            let addSqlParams = [uploadData.sender,uploadData.receiver,uploadData.role,uploadData.content,uploadData.id]

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
        }
        
        indexLatest++
	    //console.log(resdata.test);
		testNow = resdata.test;
		testSender = resdata.username;
		testReceiver = resdata.rcvname;
		//console.log(resdata.username);
        post = querystring.parse(post)
        response.end("Hello World")
	})
})


const wsServer = new WebSocketServer({
  httpServer,
  autoAcceptConnections: true
})


let sockets = {}
wsServer.on('connect', (connection) => {
  connection.on('message', (message) => {
    console.log('>>message ', message);
	var strMsg = message.utf8Data
	var regex = "@"
	var strMsgArray = strMsg.split(regex)
	console.log(strMsgArray[strMsgArray.length-2]+"->"+strMsgArray[strMsgArray.length-1])
	let idNum = strMsgArray[strMsgArray.length-2]
	let rcvNum = strMsgArray[strMsgArray.length-1]
	sockets[idNum] = connection
	var sendNow = strMsgArray[strMsgArray.length-2] + " : " + strMsgArray[0]
	try{
		let target = sockets[rcvNum]
		if(target){
			var data = {'content': sendNow, 'date': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}
			target.sendUTF( JSON.stringify(data) )
		}
		else{
			var data2 = {'content': "The User is Gone", 'date': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}
			connection.sendUTF( JSON.stringify(data2) )
		}
	}
	catch (err){
		console.log("err")
	}
  });
  // 连接的关闭监听
  connection.on('close', (reasonCode, description) => {
    console.log('[' + new Date() + '] Peer ' + connection.remoteAddress + ' disconnected.')
  })
  // 接收控制台的输入
  process.stdin.on('data', function(data){
    data = data.toString().trim()
    var data = {'content': data, 'date': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}
    connection.sendUTF( JSON.stringify(data) )
  })
})

httpServer.listen(3030, () => {
  console.log('[' + sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss') + ']  server is listening on port 3030')
})

exports.dataCollections = dataCollections
