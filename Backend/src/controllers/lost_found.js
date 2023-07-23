import {lostandFound} from '../models/lost_found.js'
import mongodb from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const { Point, distance } = mongodb;
const { MongoClient } = mongodb;
const { GeoJSON } = mongodb;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export const lostandfound_Create = async(req, res) => {
    const {title,description,category} = req.body
    if (!title || !description || !category ) {
        return res.status(422).json({ error: "please fill the field " })
    }
    try {
        let gallary_images
        if(req.files?.length > 0 ){
            gallary_images=req.files.map(file => file.path)
        }
        
        const lostfound = new lostandFound({...req.body,gallary_images,createdBy:req.user?._id})
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
        try {
            const result= await lostandFound.find(filter)
               res.status(200).json({data:result})
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}

export const lostandfoundLoc_Get = async (req, res) => {
    try {
        await client.connect();
        const db = client.db('test');
        const collection = db.collection('lost_found');



        // Create a 2dsphere index on the coordinates field
      let abccollection=  await collection.createIndex({ coordinates: "2dsphere" });
        console.log("collection :",abccollection)
        const { latitude, longitude, address_range } = req.body;
        const rangeInMeters = parseFloat(req.user?.address_range) * 1000;
        const locationPoint = {
            type: 'Point',
            coordinates: [parseFloat(req.user?.address?.longitude), parseFloat(req.user?.address?.latitude)]
        };
        
        const filter = {
            isActive: true,
            address: {
                $near: {
                    $geometry: locationPoint,
                    $maxDistance: rangeInMeters,
                },
            },
        };

        const result = await collection.find(filter).toArray();
        res.status(200).json({ data: result });
    } catch (error) {
        console.error("Error creating index:", error);
        res.status(400).json({ error: "something went wrong!" });
    } finally {
        await client.close();
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

