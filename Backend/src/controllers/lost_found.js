import {lostandFound} from '../models/lost_found.js'
import dotenv from 'dotenv';
dotenv.config();


export const lostandfound_Create = async(req, res) => {
    const {title,description,category} = req.body
     console.log("req body :",req.body,"req file :",req.files)
    if (!title || !description || !category ) {
        return res.status(422).json({ error: "please fill the field " })
    }
    try {
        // let gallary_images
        // if(req.files?.length > 0 ){
        //     gallary_images=req.files.map(file => file.path)
        // }
        const lostfound = new lostandFound({...req.body,createdBy:req.user?._id})
        let item = await lostfound.save()
        if(item){
            res.status(200).json({ message: "uploaded successfully" })
        }  
    } catch (error) {
        res.status(422).json({ error: "something went wrong!" })
    }
               
}
export const lostandfound_Update = async(req, res) => {
    const {_id} = req.params
        
        try {
            await  lostandFound.findByIdAndUpdate({_id },req.body)
               res.status(200).json({ message: "updated successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}
export const lostandfound_Get = async(req, res) => {
    let filter = {isActive:true}
    if (req.query._id) {
        filter._id =   req.query._id.split(',') 
    }
    if (req.query.type) {
        filter.type =  req.query.type.split(',') 
    }
    if (req.query.category) {
        filter.category= req.query.category 
    }
    if (req.query.title) {
        filter.title=req.query.title 
    }
    if (req.query.createdBy) {
        filter.createdBy=req.query.createdBy 
    }

        try {
            const result= await lostandFound.find(filter).populate("createdBy",'-password')
            .populate("category")
            
               res.status(200).json({data:result,count:result.length})
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}

export const lostandfoundLoc_Get = async (req, res) => {
    let {type }=req.query
    try {
        let {address_range,address}=req.user
        let {latitude,longitude}=address

        const result = await lostandFound.find({type}).populate("createdBy",'-password')
// console.log("resulut :",result)
        const filteredData = result.filter(elm => {
            if (elm.visibility === "connections" && req.user.connections.includes(elm.createdBy)) {
                return true; 
            }
            const docLatitude = parseFloat(elm.createdBy.address.latitude);
            const docLongitude = parseFloat(elm.createdBy.address.longitude);

            // Calculate the distance in kilometers between two points
            const distanceInKm = calculateDistanceInKm(latitude, longitude, docLatitude, docLongitude);

            // Check if the distance is within the specified range
            return distanceInKm <= parseFloat(address_range);
        });


        res.status(200).json({ data: filteredData,count :filteredData.length });
    } catch (error) {
        res.status(400).json({ error: "something went wrong!" });
    } 
};


export const lostandfound_Delete = async(req, res) => {
    const {_id} = req.params
        
        try {
         await  lostandFound.findByIdAndDelete({_id })
               res.status(200).json({ message: "deleted successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}


function calculateDistanceInKm(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371; 
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
    return distance;
}


function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}