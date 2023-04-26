



const adminAuth=(req,res,next)=>{

    const adminId=req.headers.authorization;

    if(adminId==="rahul1234"){
        next()
    }else{
        res.status(400).send({"msg":"YOU ARE NOT AUTHORIZIED FOR THIS ACTION"})
    }

}

module.exports={adminAuth}