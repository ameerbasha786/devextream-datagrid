const mongoose=require('mongoose');
const cred=require('./config.json')

const mongoconnect=mongoose.connect(cred.mongoDBuri,{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    try{
        console.log("connected to database")
    }catch(error){
    console.log(error.message);
    }
    })


module.exports=mongoconnect;