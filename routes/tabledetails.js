const express=require('express');
const router=express.Router();
const dbtable=require('../models/schema');
const {validationResult,check}=require('express-validator');

router.get('/',async (req,res)=>{ 
    var data=await dbtable.find();
    try{
        //console.log(data);
        res.send(data);
    }catch(error){
        res.send(error)
    }
});

router.get('/:id',async (req,res)=>{
    var data=await dbtable.find({_id:req.params.id});
    try{
        res.send(data);
    }catch(error){
        res.send({message:"user not found"})
    }
})

router.put('/:id',async (req,res)=>{
    const useritem=dbtable.findById({_id:req.params.id});
    if(useritem){
        const data=await dbtable.findByIdAndUpdate({_id:req.params.id},req.body,{useFindAndModify:false});
} try{
        res.send(data)
    }catch(error){
        res.send(error)
    }
})

router.post('/', [
    check("firstName", "firstname required").not().isEmpty(),
    check("lastName", "lastName required").not().isEmpty(),
    check("email", "email required").isEmail(),
    check("phone", "phone required").not().isEmpty(),
    check("ordername", "ordername required").not().isEmpty(),
    check("category", "category required").not().isEmpty(),
    check("price", "price required").not().isEmpty(),
    check("orderstatus", "orderstatus required").not().isEmpty(),
    check("paymentmethod", "paymentMethod required").not().isEmpty(),
    check("feedback","feedback required").not().isEmpty()
], async (req,res)=>{
    const error=validationResult(req.body)
    if(error.errors.length>0){
        console.log("errrrr",error.errors)
         res.send("validation error")
    }
    req.body.paymentmethod=req.body.paymentmethod.toUpperCase()
    const newOrder=new dbtable(req.body)
    var data=await newOrder.save();
    
    try{
        res.send(data);
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id',async (req,res)=>{
    try{
      const data=await dbtable.deleteOne({_id:req.params.id})
      res.send(data);
    }catch(error){
        res.status(500).json({message:"not found"})
    }
})
 
module.exports=router;