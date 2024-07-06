import React from 'react';
import { Box, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import MovieItem from './MovieItem.js';
import { getAllMovies } from '../../api-helpers/api-helpers';

const Movies = () => {

  const[movies, setMovies] = useState([]);

  useEffect(() =>{
    getAllMovies().then((data) => setMovies(data.movies)).catch((err) => console.log(err)) 
   },[])
  return (
    <div>
       <Box margin={"auto"} marginTop={4}>
       <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="center"
        flexWrap={"wrap"}
      >
        {movies && movies.map((movie, index) => <MovieItem id={movie._id} title={movie.title} 
      releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} key={index}/>)}
      </Box>
       </Box>
    </div>
  )
}

export default Movies
