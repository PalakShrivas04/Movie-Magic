import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import { getAllMovies } from '../api-helpers/api-helpers';
import MovieItem from './MovieItem';

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error)=> console.log(error))
  },[])
  return(
  <Box margin={"auto"} marginTop={4}>
      <Typography variant="h4" margin="auto"padding={2} width="40%"
        bgcolor={"#900C3F"} color="white" textAlign="center">
        All Movies
      </Typography>
      <Box width={"100%"} margin="auto" marginTop={5}
        display={"flex"} justifyContent={"flex-start"} flexWrap={"wrap"}>
       {movies &&
          movies
            .map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
        </Box>
  </Box> 
  )
};

export default Movies