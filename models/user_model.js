import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},
    age:{type:Number},
    gender:{type:String},
    height:{type:Number},
    weight:{type:Number},
    lifestyle:{type:String},
    dietPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "WeeklyPlanner" }],
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "HealthReport" }],
    createdAt:{type:Date,default:Date.now},
});
export default mongoose.model("User",user_schema);
    