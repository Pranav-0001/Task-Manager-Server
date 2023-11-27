import { matchedData } from "express-validator";
import bcrypt from "bcrypt";
import userSchema from "../model/userSchema.js";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    requestData["password"] = await bcrypt.hash(requestData.password, 10);
    const user = await new userSchema({
      ...requestData,
    }).save();
    const token = jsonwebtoken.sign(
        { sub: { user } },
        "access",
        {
          expiresIn: "7d",
        }
      );
    res.status(200).json({login:true, user,token });
  } catch (err) {
    if(err.code===11000) res.status(409).json({error:true,email:"Email already exists"})
    else res.status(500).json({ server: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    console.log({ requestData });

    const user = await userSchema.findOne({ 
      email: requestData["email"],
    });



    if (user) {
      if (await bcrypt.compare(requestData["password"], user["password"])) {
        const token = jsonwebtoken.sign(
          { sub: { user } },
          "access",
          {
            expiresIn: "7d",
          }
        );
        res.json({ user, login: true, token });
      } else {
        res.json({ login: false,error:true, password: "Incorrect password" });
      }
    } else {
      res.json({ login: false, error:true,email: "Email not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const getUserById=async(req,res)=>{
  try {
    const {id}=req.params

    const user=await userSchema.findOne({_id:new mongoose.Types.ObjectId(id)})
    res.status(200).json({user})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}