import { User } from "../models/user.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../middleware/email_send.js";

export const userSignup = async(req, res) => {
  const { status, email, password, name } = req.body;
  let image = req.file?.filename;
  if (!status || !email || !password || !name) {
    return res.status(400).json({ error: "please fill all fields " });
  }
  try {
 let saveUser= await User.findOne({ email})
      if (saveUser) {
        return res.status(400).json({ error: "email already registered" });
      }
      function generateActivationCode() {
        const min = 1000; 
        const max = 9999; 
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        const activationCode = generateActivationCode();
        await sendMail(email, "Account Verification Code ", `<h2>Code :</h2>
        ${activationCode} `)
        let hashedpassword = await bycrypt.hash(password, 12)
        const user = new User({
          ...req.body,
          password: hashedpassword,
          image,
          verification_code:activationCode
        });
        let userData =  await user.save()
        const token = jwt.sign(
          { _id: userData._id },
          process.env.JWT_SECRET
        );
        userData.password = undefined;
        userData.code=undefined;
        res.status(200).json({ message: "Verify Your Account", token, user:userData });  
  } catch (error) {
    return res.status(400).json({ error: "something went wrong!" });
    
  }
};

export const userVerify = async (req, res) => {
  const {verification_code,_id}=req.body
  if(!_id){
    return res.status(400).json({ error: "user id is required" });
  }
  if(!verification_code){
    return res.status(400).json({ error: "please fill the code" });
  }
  try {
    let userCheck= await User.findById(_id);
    if(userCheck.verification_code !== verification_code){
      return res.status(400).json({ error: "please enter valid code" });    
   }
   await User.findByIdAndUpdate(_id, {verification_code:null,email_verified:true});
    res.status(200).json({ message: "verified email successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};




export const userLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "please add email or password" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(400).json({ error: "invalid email or password " });
      }
      bycrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          savedUser.password = undefined;
          res.json({ message: "Successfull Login", token, user: savedUser });
        } else {
          return res.status(400).json({ error: "invalid email or password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


export const userUpdate = async (req, res) => {
  console.log("user data :",req.body)
  const { _id } = req.params;
  const {password}=req.body
  let passwordUpdate=false
  let newPassword
  if(password){
  passwordUpdate=true
  newPassword=await bycrypt.hash(password, 12)
  }
  try {
    const updateData = passwordUpdate ? { ...req.body, password: newPassword } : req.body;
    await User.findByIdAndUpdate(_id, updateData);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};


export const userGet = async (req, res) => {
  let filter = {isActive: true };
  if (req.query._id) {
    filter._id= req.query._id.split(",")
  }
  try {
    let result = await User.find(filter).select("-password");
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
};

//   forgot password

export const forgotPass = async(req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "please enter email" });
    }
    try {
      let userData = await User.findOne({email})
      if(!userData){
        return res.status(400).json({error:"email not found"})
      }

      function generateActivationCode() {
        const min = 1000; 
        const max = 9999; 
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        const activationCode = generateActivationCode();
        await sendMail(email, "Forgot password", `<h2>Code :</h2>
        ${activationCode} `)
      let _id =userData._id
        await User.findByIdAndUpdate(_id, {resetCode:activationCode});
        userData.password=undefined
        res.status(200).json({ message: "code send to your email",user:userData });
    } catch (error) {
        res.status(400).json({error:"something went wrong!"})
    }
};


// verify forgot code 

export const verifyForgotcode = async (req, res) => {
  console.log("req body :",req.body)
  const {resetCode,_id}=req.body
  if(!_id){
    return res.status(400).json({ error: "user id is required" });
  }
  if(!resetCode){
    return res.status(400).json({ error: "please fill the code" });
  }
  try {
    let userCheck= await User.findById(_id);
    if(userCheck.resetCode !== resetCode){
      return res.status(400).json({ error: "please enter valid code" });    
   }
   await User.findByIdAndUpdate(_id, {resetCode:null});
   userCheck.password=undefined
    res.status(200).json({ message: "Please enter your new password",user:userCheck });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};



