import mongoose from 'mongoose'
const Order = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, ref: "user",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId, ref: "cloths"
    },
    size:{
        type:String,
    },
    total_price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    order_type:{
        type:String,
        required:true
    },
    payment_status:{
        type:String,
        default:"pending"
    },
    delivery_status:{
        type:String,
        default:"pending"
    },
    assign_tailor:{
        type:mongoose.Schema.Types.ObjectId, ref: "user", 
    },
    un_stitched:{
        type:mongoose.Schema.Types.ObjectId, ref: "unstitchedOrder"
    },
    isActive:{
        type:Boolean,
        default:true
    },
   
},{ timestamps: true })
export  const order = mongoose.model('order', Order)
