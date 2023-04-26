const express= require("express");
const { ContactModel } = require("../Models/Contacts");
const { adminAuth } = require("../Middlewares/Auth");



const ContactRouter=express.Router();

ContactRouter.get("/:n",adminAuth, async(req,res)=>{
    let {n}=req.params;
    let n2= n*10;
    let n1= n2-10;

    try {
        let data=await ContactModel.find();
        
        let arr= [];
        for(let i=n1;i<n2;i++){
            if(data[i]==undefined){
                res.send(arr);
            }
            arr.push(data[i]);
        }
        res.send(arr);
    } catch (error) {
       res.send("error") 
    }
})

ContactRouter.get("/searchbyemail/:email",adminAuth, async(req,res)=>{
  const {email}=req.params;
try {
    let data= await ContactModel.find({email});
   
    if(data.length==0){
        res.status(400).send({"msg":"No user Found"})
    }else{
        res.send(data); 
    }
} catch (error) {
    res.status(400).send({"err":"User Not Found"})
}
  

})

ContactRouter.get("/searchbyname/:name",adminAuth, async(req,res)=>{
    const {name}=req.params;
  try {
      let data= await ContactModel.find({name});
      
      if(data.length==0){
        res.status(400).send({"msg":"No user Found"})
    }else{
        res.send(data); 
    }
  } catch (error) {
      res.status(400).send({"err":"User Not Found"})
  }
    
  
  })

ContactRouter.post("/add",adminAuth, async(req,res)=>{
     const {name,number,email}=req.body;

     const d= await ContactModel.find({email});
     console.log(d);
     if(d.length>0){
        res.status(400).send({"msg":"Email Id Alredy Exist try another"})
     }
     
     let data= ContactModel(req.body);  
     await data.save()     
     res.status(200).send({"msg":"SuccesFully Added"})
})         

ContactRouter.delete("/delete/:id",adminAuth, async(req,res)=>{
  let {id}=req.params;
  let data= await ContactModel.findByIdAndDelete({_id:id})
  res.send({"msg":"SucessFully Deleted"})
  
  
})


ContactRouter.patch("/edit/:id",adminAuth, async(req,res)=>{
    let {id}=req.params;
    let data= await ContactModel.findByIdAndUpdate({_id:id},req.body);
    res.send({"Msg":"Sucessfully edited"});
    
})


      
module.exports={
    ContactRouter
}

