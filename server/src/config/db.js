import mongoose from "mongoose"

const dbConnect = async()=>{
try {
const MONGO_URI = process.env.MONGO_DB_URI
if(!MONGO_URI){
    throw new Error("MONGO_URI is not defined in the environment variables")
}
await mongoose.connect(MONGO_URI)
console.log("MOngoDb is connected")
} catch (error) {
    console.log("Error while connecting database")
    throw new Error(error)
}
}

export default dbConnect