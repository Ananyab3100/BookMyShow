
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user-routes.js';
import adminRouter from './routes/admin-routes.js';
import movieRouter from './routes/movie-routes.js';
import bookingsRouter from './routes/booking-routes.js';




const app = express();

// Add CORS middleware
app.use(cors());
//middleware
app.use(express.json());
app.use('/user' , userRouter);
app.use('/admin',adminRouter);
app.use('/movie',movieRouter);
app.use('/booking',bookingsRouter);





app.use('/' ,(req, res, next) =>{
    res.send("Response sent!")
});

app.listen(5000,() =>{
    console.log(`Connected to localhost ${5000}!`)
});

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_URL}@cluster0.hwqdxzg.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {console.log("Connected to database!")})
.catch((e) =>{console.log(e)});
