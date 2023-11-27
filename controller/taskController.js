import { matchedData } from "express-validator";
import mongoose from "mongoose";
import taskSchema from "../model/taskSchema.js";

export const createTask = async (req, res) => {
  try {
    const requestData = matchedData(req);
    requestData["createdBy"] = new mongoose.Types.ObjectId(
      requestData["createdBy"]
    );
    const task = await new taskSchema({
      ...requestData,
    }).save();
    await task.populate('createdBy',"username")
    
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const getAllTasks = async (req, res) => {
  try {
    const requestData=matchedData(req)
    const skip=parseInt(requestData.limit)*(parseInt(requestData.page)-1)
    const tasks = await taskSchema.find().populate("createdBy", "username").sort({createdAt:-1}).skip(skip).limit(parseInt(requestData.limit))
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateTaskById = async (req, res) => {
  try {
    const requestData=matchedData(req)
    const {id}=req.params
    if(req?.user?._id===requestData?.createdBy){
      const updatedTask=await taskSchema.findOneAndUpdate({_id:new mongoose.Types.ObjectId(id)},{$set:{
        ...requestData
      }},{new:true})
      return res.status(200).json({updatedTask})
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const deleteTaskById = async(req,res)=>{
  try {
    const requestData=matchedData(req)
    const {id}=req.params
    if(req?.user?._id===requestData?.createdBy){
      await taskSchema.deleteOne({_id:new mongoose.Types.ObjectId(id)})
      return res.status(200).json({delete:true})
    }
    res.status(401).json({unauthorized:"user don't have the permission to delete this taks"})
    
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export const getTasksByStatus = async(req,res)=>{
  try {
    const requestData=matchedData(req)
    const skip=parseInt(requestData.limit)*(parseInt(requestData.page)-1)
    const tasks=await taskSchema.find({status:requestData.status}).sort({createdAt:-1}).skip(skip).limit(parseInt(requestData.limit))
    res.json({tasks})
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}