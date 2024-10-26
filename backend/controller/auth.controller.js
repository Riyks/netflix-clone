import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateTokens.js';
export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        //to make sure email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "invalid email" })
        }
        if (!strongPasswordPattern.test(password)) {
            return res.status(400).json({ success: false, message: "password must be atleast 8 characters with atleast 1 uppercase , 1 lower case , 1 digit and 1 special character  " })
        }
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "user with this email already exists" })
        }
        const existingUserByUsername = await User.findOne({ username: username })
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "user with this username already exists" })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        });

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        //remove password from the response
        res.status(200).json({
            success: true,
            user: {
                ...newUser._doc,
                password: ""
            }
        })





    } catch (error) {
        console.log("error in signup controller ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function login(req, res) {
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({sucess:false,message:"All fields are required"});
        }
        const user = await User.findOne({email:email})
            if(!user){
                return res.status(404).json({success:false,message:"Invalid credentials"});
            }
            const isPasswordCorrect = await bcryptjs.compare(password,user.password)
            if(!isPasswordCorrect){
                return res.status(404).json({success:false,message:"Invalid credentials"});
            }
            generateTokenAndSetCookie(user._id,res)
            res.status(200).json({
                success: true,
                user: {
                    ...user._doc,
                    password: ""
                }
            })
            

    }catch(error){
        console.log("error inlogin controller");
        res.status(500).json({success:false,messgae:"internal server error"})
    }
}

export async function logout(req, res) {
   try{
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true,message:"logged out successfully"})
   }catch(error){
        console.log("error in logout controller ",error.message);
        res.status(500).json({success:false,messgae:"internal server error"})
   }
}

export async function authCheck(req,res) {
    try{
        res.status(200).json({success:true,user:req.user});
    }   
    catch(error){
        console.log("error in authcheck controller:" ,error.message);
        res.status(500).json({success:false,message:"internal error"})
    }
}