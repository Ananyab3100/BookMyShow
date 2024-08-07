import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email:{
        type: String,
        required : true ,
        unique: true
    },
    password :{
        type: String,
        required :true,
    },
    addedMovies: [{
        type: mongoose.Types.ObjectId,
        ref: "Movie",
    }]
});

export default mongoose.model("Admin", adminSchema);