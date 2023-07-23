import mongoose from 'mongoose'
const Notification = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId, ref: "user",
    },
    product:{
        type:mongoose.Schema.Types.ObjectId, ref: "cloths"
    },
    order_type:{
        type:String,
    },
    assign_tailor:{
        type:mongoose.Schema.Types.ObjectId, ref: "user", 
    },
    un_stitched:{
        type:mongoose.Schema.Types.ObjectId, ref: "unstitchedOrder"
    },
    order_id:{
        type:mongoose.Schema.Types.ObjectId, ref: "order"
    },
    readby:{
        type:[]
    },
    isActive:{
        type:Boolean,
        default:true
    },
   
},{ timestamps: true })
export  const notification = mongoose.model('notification', Notification)
