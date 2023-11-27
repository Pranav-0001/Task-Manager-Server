import mongoose from "mongoose";

export const db = mongoose.connect('mongodb://localhost:27017/machine-test').then(()=>{
    console.log("db started");
})