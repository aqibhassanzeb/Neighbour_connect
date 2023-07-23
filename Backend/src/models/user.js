import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status: {
        type: String,
        required: true,
        enum:['admin','user']
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address:{
        latitude:{
            type:String
        },
        longitude:{
            type:String
        }
    },
    address_range:{
        type:String
    },
    roport_status:{
        type:String
    },
    verification_code:{
        type:String
    },
    image:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    detail:{
        type:String
    },
    connections:{
        type:[]
    },
    email_verified:{
        type:Boolean,
        default:false
    },
    resetCode: String,
    expireToken: Date,
},{ timestamps: true })
export  const User = mongoose.model('user', UserSchema)
