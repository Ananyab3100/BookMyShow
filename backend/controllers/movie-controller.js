import mongoose from "mongoose";
import Movie from "../models/Movies.js";
import jwt  from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const addMovie = async(req,res,next) =>{
    const extractedToken = req.headers.authorization.split(" ")[1];
    if(!extractedToken && extractedToken.trim() ===""){
        return res.status(404).json({message: "Token not Found!"})
    }
    console.log(extractedToken);

    //verify
    let adminId ;
    jwt.verify(extractedToken, process.env.SECRET_KEY ,(err, decrypted) =>{
     if(err){
        return res.status(400).json({message :`${err.message}`})
     }
     adminId = decrypted.id;
     return;
    })

    //create new movie

    const {title, description ,actors,releaseDate, posterUrl, featured} = req.body;

    if(!title && title.trim()==="" && 
    !description && description.trim()==="" &&
    !posterUrl && posterUrl.trim() === ""){
        res.status(422).json({message:"Invalid Inputs"})
     }

    let movie;
    try{
     movie = new Movie({
     title,
     description,
     actors,
     releaseDate: new Date(`${releaseDate}`),
     posterUrl,
     featured,
     admin : adminId,
     });

 const session = await mongoose.startSession();
const adminUser = await Admin.findById(adminId);
session.startTransaction();
await movie.save({session});
adminUser.addedMovies.push(movie);
await adminUser.save({session});
await session.commitTransaction();


 }
catch(err){
     console.log(err);
}
    if(!movie){
        return res.status(500).send({message: "Unable to create movie"});
    }

    return res.status(201).json({movie});
}



export const getAllMovies = async(req,res,next) =>{
let movies;
try{
movies = await Movie.find();
if(!movies){
    return res.status(500).send({message:"Request Failed"})
}
return res.status(200).send({movies});

}
catch(err){
    console.log(err);
}
}

export const getMovieById = async(req,res, next) =>{
const id = req.params.id;
let movie;
try{
 movie = await Movie.findById(id);

 if(!movie){
    return res.status(404).send({message:"Invalid Movie ID"})
 }

 return res.status(200).send({movie});

}
catch(err){
    console.log(err);
}
}