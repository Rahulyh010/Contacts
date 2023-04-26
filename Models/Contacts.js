const { default: mongoose } = require("mongoose");



const contactSchema=mongoose.Schema({
     name:String,
     number:Number,
     email:String
})



const ContactModel=mongoose.model("contact",contactSchema);


module.exports={
    ContactModel
}