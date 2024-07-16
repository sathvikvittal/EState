import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const register = async (req,res) =>{
    //ops
    try{
        const {username,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,8);
        const newUser = new User({
            username:username,
            email:email,
            password:hashedPassword
        })
        await newUser.save()
        res.status(201).json({message: "User successfully created!"});

    }
    catch(err){
        res.status(500).json({error:"Email/username already exists"});
    }
}

export const login = async (req,res) =>{
    //ops
    try{
        const {username,password} = req.body;
        // console.log(username,password);
        const user = await User.findOne({username:username});
        if (!user){
            res.status(401).json({"message" : "Username does not exists"})
        }
        const validPassword = await bcrypt.compare(password,user.password);
        
        if (validPassword){
            const token = jwt.sign({id : user._id},process.env.SECRET_KEY,{ expiresIn: "1h"})
            // res.status(200).json({Authorization: token});
            const time = 1000 * 60 * 60
            const {password, ...userDetails} = user._doc;
            // console.log(userDetails)
            res.cookie("token",token, {
                httpOnly: true,
                // secure: true,
                maxAge: time,
            })
            .status(200)
            .json(userDetails)
            // console.log("Sent")

        }
        else{
            res.status(401).json({message:"Incorrect username/password"})
        }
        // res.send(validPassword);

    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

export const logout = (req,res) =>{
    //ops
    res.clearCookie("token").status(200).json({message: "Logout Successful"})
}