const mongoose=require('mongoose');

const tableschema=new mongoose.Schema({
firstname:{type:String, required:true},
lastname:{type:String, required:true},
email:{type:String, required:true},
phone:{type:String, required:true},
ordername:{type:String, required:true},
category:{type:String, required:true},
price:{type:String, required:true},
orderstatus:{type:String, required:true},
paymentmethod:{type:String, required:true},
feedback:{type:String,required:true}
});

module.exports= tablestructure =mongoose.model("orderdeatails",tableschema);