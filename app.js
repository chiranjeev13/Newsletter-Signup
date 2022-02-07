const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app=express()
const https = require('https');

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.email

  const data={
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields:
      {
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
  }
  const jsonData=JSON.stringify(data)


  const url= "https://us14.api.mailchimp.com/3.0/lists/114fc00b3b"
  const options =
  {
    method : "POST",
    auth: "chiranjeev:39d0dd6548d9433495ba7815b313e082-us14"
    }
    const request = https.request(url,options,function(response){
      response.on("data",function(data){
        console.log("DONE");

      })
      if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
      }
      else{
        res.sendFile(__dirname + "/failure.html")
      }
    })
  request.write(jsonData);
  request.end();
})









app.listen(3001,function(){
  console.log("Server ported");
})

//API
//39d0dd6548d9433495ba7815b313e082-us14

//LIST ID
//114fc00b3b
