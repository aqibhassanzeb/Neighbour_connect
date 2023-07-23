import { lostandFoundCateg } from "../models/lostandfound_categ.js"


export const lostfoundCateg_Create = (req, res) => {
    const {name} = req.body
    if (!name ) {
        return res.status(422).json({ error: "please fill the name " })
    }
    lostandFoundCateg.findOne({ name })
        .then((already) => {
            if (already) {
                return res.status(422).json({ message: 'already registered' })
            }
                    const lostandfoundCateg = new lostandFoundCateg(req.body)
                    lostandfoundCateg.save()
                        .then(resp => {
                            res.status(200).json({ message: "register successfully" })
                        }).catch((err) => {
                            console.log(err)
                        })
               
        }).catch((err) => {
            console.log(err)
        })
}
export const lostfoundCateg_Update = async(req, res) => {
    const {_id} = req.params
        
        try {
            await  lostandFoundCateg.findByIdAndUpdate({_id },req.body)
               res.status(200).json({ message: "updated successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}
export const lostfoundCateg_Get = async(req, res) => {
    let filter = {isActive:true}
    if (req.query._id) {
        filter = { _id: req.query._id.split(','),isActive:true }
    }
        try {
            const result= await  lostandFoundCateg.find(filter)
               res.status(200).json({data:result})
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}
export const lostfoundCateg_Delete = async(req, res) => {
    const {_id} = req.params
        
        try {
         await  lostandFoundCateg.findByIdAndDelete({_id })
               res.status(200).json({ message: "deleted successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}