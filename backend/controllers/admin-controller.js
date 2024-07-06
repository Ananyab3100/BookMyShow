import Admin from "../models/Admin.js" ;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const addAdmin = async(req,res,next) =>{
const {email, password} = req.body;

if(!email && email.trim() ===""  && !password && password.trim() ===""){
    return res.status(422).json({message : "Invalid inputs."})
}

let existingAdmin ;
try{
 existingAdmin = await Admin.findOne({email});

 if(existingAdmin){
    return res.status(400).json({message: "Admin already exists!"})
 }

 const hashedPassword = bcrypt.hashSync(password);
 let admin;
 admin = new Admin({email , password : hashedPassword});
 admin = await admin.save();

 if(!admin){
    return  res.status(500).json({message: "Unable to store Admin"});
 }

 return res.status(201).json({admin})
}
catch(err){
   return  console.log(err);
}
}



export const adminLogin = async(req, res, next) =>{
const { email, password} = req.body;

if(!email && email.trim() ===""  && !password && password.trim() ===""){
    return res.status(422).json({message : "Invalid inputs."})
}

let existingAdmin;
try{
 existingAdmin = await Admin.findOne({email});
 if(!existingAdmin){
 return res.status(400).json({message:"Admin does not exists!"})
 }

 const isCorrectPassword = bcrypt.compareSync(password, existingAdmin.password);

 if(!isCorrectPassword){
    return res.status(400).json({message:"Incorrect password"})
 }

 const token = jwt.sign({id:existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn : "365d",
 })

 return res.status(200).json({message : "Authentication successful !" , token , id : existingAdmin._id})
}
catch(err){
   return console.log(err);
}
 
}

export const getAdmins =async( req, res, next) =>{
let admins;
try{
    admins = await Admin.find();
}
catch(err) {
   return console.log(err);
}

if(!admins){
    return  res.status(500).json({message: "Unable to get Admins"});    
}

return res.status(200).send({admins});
}

export const  getAdminById =async( req, res, next) =>{
    const id = req.params.id;
    let admin;
try{
    admin = await Admin.findById(id).populate("addedMovies")
}
catch(err) {
   return  console.log(err);
}

if(!admin){
    return  res.status(500).json({message: "Cannot find Admin"});    
}

return res.status(200).send({admin});
}