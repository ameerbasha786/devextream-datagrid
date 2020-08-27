const express=require('express');
const route=express();

route.get('/',(req,res)=>{
res.json({"message":"welcome to jazeera orders"})
});

route.use('/tabledetails',require('./tabledetails.js'))

module.exports=route;