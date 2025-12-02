import mongoose from "mongoose"
import { MONGO_URL } from '../config/Config.js'

const  ConnectDB =async()=>{
    try{
        // await mongoose.connect(MONGO_URL).then(()=>{
        //     console.log("Database connected")
        // }).catch((err)=>{
        //     console.error(err)
        // })

        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected");
    }catch(error){
        console.error(error)
    }
}

export default ConnectDB;