
import Booking from '../models/Bookings.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) =>{
    let users;
    try{
    users = await User.find();
    }
    catch(err){
    return console.log(err);
    }
    if(!users){
       return  res.status(500).json({message: "An error occured"})
    }
    return res.status(200).json({users});
}

export const signUp = async(req,res,next) =>{

    const {name, email, password} = req.body;
    if(!name && name.trim() ==="" && !email && email.trim()==="" && !password && password.trim() ===""){
        return res.status(422).json({message : "Invalid inputs."})
    }
    
    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try{
      user = new User({name,email,password : hashedPassword});
      user =  await user.save();
    }
    catch(err){
        return console.log(err);
    }

    if(!user){
       return  res.status(500).json({message: "An error occured"});
    }

    return res.status(201).json({id : user._id});
}

export const updateUser = async(req,res,next) =>{
    const id = req.params.id;
    const {name,email, password} = req.body;

    if(!name && name.trim() ==="" && !email && email.trim()==="" && !password && password.trim() ===""){
        return res.status(422).json({message : "Invalid inputs."})
    }
    
    const hashedPassword = bcrypt.hashSync(password);
let user;
try{
 user = await User.findByIdAndUpdate(id,{
    name ,
    email,
    password : hashedPassword,
 });
 if(!user){
    return  res.status(500).json({message: "An error occured"});
 }

 return res.status(201).json({message : "User created successfully!"})

}
catch(err){
    console.log(err);
}

}

export const deleteUser = async(req,res,next) =>{
   const id = req.params.id;

    let user;
   
    try{
    user = await User.findByIdAndDelete(id);
    }
    catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(500).json({message: "Something went wrong!"})
    }

    return res.status(200).json({message:"User deleted successfully!"})
}


export const login = async(req,res,next) => {
const {email , password} = req.body;
if(!email && email.trim()==="" && !password && password.trim() ===""){
    return res.status(422).json({message : "Invalid inputs."})
}
let existingUser;
try{
existingUser = await  User.findOne({email});

if(!existingUser){
    return res.status(404).json({message: "Unable to find the user"})
}

const isCorrectPassword = bcrypt.compareSync(password,existingUser.password)

if(!isCorrectPassword){
    return res.status(400).json({message: "Incorrect Password!"})
}

}
catch(err){
    console.log(err);
}
return res.status(200).json({message :"Login Successful !" , id: existingUser._id})

}

export const getBookingsOfUser = async(req,res,next) =>{
 const id = req.params.id;
 let bookings;
 try{
 bookings = await Booking.find({user : id})
 .populate("movie")
 .populate("user");
 } 
 catch(err){
    console.log(err);
 }
 if(!bookings){
    return  res.status(500).json({message: "An error occured"});
 }
 return res.status(200).json({bookings});

}

export const getUserById = async(req,res, next) =>{
const id = req.params.id;
let user;
   
try{
user = await User.findById(id);
}
catch(err){
    console.log(err);
}
if(!user){
    return res.status(500).json({message: "Something went wrong!"})
}

return res.status(200).json({user})

}