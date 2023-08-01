import mongoose from 'mongoose'


const lostFound = new mongoose.Schema({
    title:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId, ref:"lostandfoundCateg",
        required :true
    },
    gallary_images:{
        type:[]
    },
    location:{
        latitude:{
            type:String
        },
        longitude:{
            type:String
        }
    },
    type:{
        type:String,
    },
    description:{
        type:String,
    },
    visibility:{
        type:String,
    },
    notify:{
        type:Boolean,
        default:false
    },
    mark_found:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    },
    date:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref: "user",
        required:true
    }
   
},{ timestamps: true })

export  const lostandFound = mongoose.model('lost_found', lostFound)
