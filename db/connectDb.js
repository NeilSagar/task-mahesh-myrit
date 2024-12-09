// "mongodb://localhost:27017/myDatabase"


import mongoose from "mongoose";



export const connectDB = ()=>{
    const DB_URI = "mongodb://localhost:27017/myDatabase";
    try {
        mongoose.connect(DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to database");
    }    
}