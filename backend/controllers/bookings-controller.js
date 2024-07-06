import mongoose from "mongoose";
import Booking from "../models/Bookings.js";
import Movie from "../models/Movies.js";
import User from "../models/User.js";


export const newBooking = async(req, res,next) => {

const {movie, date, seatNumber ,user} = req.body;
//console.log(movie ,date , seatNumber , user);



let existingMovie;
let existingUser;
try{
existingMovie =  await Movie.findById(movie);
existingUser = await User.findById(user);
//console.log(existingMovie , existingUser)
}
catch(err){
console.log(err);
}

if(!existingMovie){
    return res.status(404).json({message:"Movie Not Found with given ID"})
}

if(!existingUser){
    return res.status(404).json({message:"User Not Found with given ID"})
}



let booking;

try{
booking = new Booking({
    movie,
    date : new Date(`${date}`),
    seatNumber,
    user,
});
const session = await mongoose.startSession();
session.startTransaction();
existingUser.bookings.push(booking);
existingMovie.bookings.push(booking);
await booking.save({session});
await existingUser.save({session});
await existingMovie.save({session});

session.commitTransaction();
}
catch(err){
    console.log(err);
}

//console.log(booking);

if(!booking){
    return res.status(500).send({message: "Unable to create booking"});
}
return res.status(201).send({booking});
}


export const getBookingById = async(req,res,next) =>{
    const id = req.params.id;
    let booking;

    try{
     booking = await Booking.findById(id);
     console.log(booking)
    }
    catch(err){
        console.log(err);
    }

    if(!booking){
        return res.status(500).json({message: "Unable to find booking by this id"});
    }

    return res.status(200).json({booking});
}

export const deleteBooking = async(req,res,next) =>{
    let id = req.params.id;
    let booking;

    try{
     booking = await Booking.findByIdAndDelete(id).populate("user movie");
     //console.log(booking);
     const session = await mongoose.startSession();
     if (booking.user && booking.movie) {
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({ session });
        await booking.user.save({ session });
    }
    }
    catch(err){
        console.log(err);
    }

    if(!booking){
        return res.status(500).json({message: "Unable to delete!"})
    }

    return res.status(200).json({message:"Booking deleted successfully!"})
}
