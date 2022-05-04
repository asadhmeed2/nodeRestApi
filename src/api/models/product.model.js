const mongoose =require('mongoose');

const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,
        minLength:1,
    },
    price:{
        type:Number,
        required:true
    }
})


module.exports = mongoose.model('Products' , productSchema)