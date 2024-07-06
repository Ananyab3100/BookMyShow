import React from 'react';
import { useEffect,useState } from 'react';
import { Box, Typography,Button } from '@mui/material';
import MovieItem  from './Movies/MovieItem.js'
import { Link } from 'react-router-dom';
import { getAllMovies } from '../api-helpers/api-helpers.js';

const HomePage = () => {
  const[movies, setMovies] = useState([]);

  useEffect(() =>{
   getAllMovies().then((data) => setMovies(data.movies)).catch((err) => console.log(err)) 
  },[])
  //console.log(movies);
  return (
    <div>
     <Box width={"100%"} height="100vh" margin="auto" marginTop={2}>
     <Box margin={"auto"} width ="80%" height= {"40%"} padding={2}>
      <img src='https://i.ytimg.com/vi/yEinBUJG2RI/maxresdefault.jpg'
       alt='img1' width ={"100%"}  height={"100%"}></img>
     </Box>
     <Box padding ={'5'} margin ="auto">
     <Typography variant='h4' textAlign={"center"}>Latest Releases</Typography>
     </Box>
     <Box
         margin={"auto"}
        display="flex"
        width="90%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
      {movies && movies.slice(0,4).map((movie, index) => <MovieItem id={movie._id} title={movie.title} 
      releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} key={index}/>)}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
         LinkComponent={Link}
         to='/movies'
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
     </Box>
    </div>
  )
}

export default HomePage
