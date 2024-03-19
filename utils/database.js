import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log("mongodb is already connected")
        return
    }

    // not connected yet
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_promp",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log("mongodb is connected")
    } catch (error) {
        console.log(error)
    }
}