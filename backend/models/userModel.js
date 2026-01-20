import mongoose from "mongoose"; 
import validator from "validator"; 
import bcryptjs from "bcryptjs";



const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        maxLength:[25, "Invalid name. PLease enter a name wiht fewer than 25 characters"],
        minLength:[3,"Name should contain more than 3 characters"]
    },
    email:{
        type:String, 
        required:[true, "Please Enter your email"],
        unique: true, 
        validate:[validator.isEmail, "Please enter valid email"]
    }, 
    password:{
        type:String,
        required: [true, "Please enter your password"],
        minLength:[8 , "Password should be greater than 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true 
        },
        url:{
            type: String,
            required: true 
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
}, { timestamps: true })


// Password Hashing 
userSchema.pre("save", async function(next){
    this.password = await bcryptjs.hash(this.password, 10) 
    //1st- updating profile (name, email, image) -- hashed password will be hashed again
    //2nd  - update password 
    if(!this.isModified("password"))
    {
        return next();
    }

})


export default mongoose.model("User", userSchema); 