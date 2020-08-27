const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const mongodb=require('./db/dbconfig');

mongodb;

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept , x-access-token");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.use(bodyparser.json());

app.use('/',require('./routes'));


app.listen(8080);