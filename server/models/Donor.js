const mongoose=require('mongoose')
const donorScheme = new mongoose.Schema({
    name:{
        type:String,
        default:"בעילום שם"
    },
    email:{
        type:String,
    },
    numberPhon:{
        type:String
    },
    commemoratesNames:{
        type:String
    },
    notes:{
        type:String
    }
})
module.exports=mongoose.model('Donor',donorScheme)