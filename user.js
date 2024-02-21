var express= require('express')
var app=express()

var fs= require('fs')
app.get('/',function(req,res){
    res.send("start my server")
})
app.get('/form', function(req,res)
{
    res.sendFile(__dirname+'/form.html')
})

app.get('/listUsers', function(req,res)
{
    var data= fs.readFileSync(__dirname+"/users.json") //as byte
    res.send(String(data))
})

app.get('/user/:id', function(req,res)
{

    var arr =["1", "2", "3"]
    if (arr.includes(String(req.params.id)))
    {
    var data= fs.readFileSync(__dirname+"/users.json") //as byte
    data= JSON.parse(String(data))
    console.log(data)
    var user = data['user'+req.params.id]
    console.log(user)

    res.send(user)
    }
    else
    {
      res.send("user id error")
    }
   
})
app.delete('/deleteUser/:id', function(req,res)  ///postman
{var arr =["1", "2", "3"]
if (arr.includes(String(req.params.id)))
{
    var data= fs.readFileSync(__dirname+"/users.json") //as byte
    data= JSON.parse(String(data))
    delete data['user'+req.params.id]
    res.send(data)}
    else
    {
      res.send("user id error")
    }
})

var bodyParser= require('body-parser')
var urlEncoded= bodyParser.urlencoded({extended:false})

app.post('/addUser', urlEncoded,function(req,res) ///postman 
{
    var newUser={name:"", password:"", prof:"",id:""}
    newUser.name=req.body.name
    newUser.password=req.body.password
    newUser.prof=req.body.profession
    var data= fs.readFileSync(__dirname+"/users.json") //as byte
    data= JSON.parse(String(data))
    newUser.id = String(Object.keys(data).length+1)
    data['user' + String(Object.keys(data).length +1)]= newUser
    res.send(data)
})
var server= app.listen(5000, function()
{
    var host = server.address().address 
    var port = server.address().port 
})