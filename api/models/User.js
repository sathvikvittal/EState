import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:2,
        max:20,
        unique: true
    },
    password:{
        type:String,
        required:true,
        min:2,
        max:20,
    },
    email:{
        type:String,
        required:true,
        min:2,
        max:20,
        unique: true
    },
    profilePicture:{
        type:String,
        default:""
    },
    createdAt :{
        type:Date,
        default: new Date()
    }
    
})

const User = mongoose.model("User",userSchema);
export default User;