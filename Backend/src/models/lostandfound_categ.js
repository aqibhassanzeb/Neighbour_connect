import mongoose from 'mongoose'
const lostAndFoundCateg = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
   
},{ timestamps: true })
export  const lostandFoundCateg = mongoose.model('lostandfoundCateg', lostAndFoundCateg)
