import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    regnumber:{type:String, required:true},
    firstname:{type:String, required:true},
    surname:{type:String, required:true},
    program:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, default:'0000000000'},
    yearofstudy:{type:String, required:true}
   
}
)

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel