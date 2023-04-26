const { default: mongoose } = require("mongoose")



const db= async()=>{

    try {
        let res= await mongoose.connect(`mongodb+srv://rahulyh63:rahul@cluster0.3hght0o.mongodb.net/contacts?retryWrites=true&w=majority`)
   console.log("Connected to server")
    } catch (error) {
        console.log(error)

    }
}

module.exports={
    db
}