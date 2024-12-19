import { data } from "./data.js";

let movieId = 0;
let movies = data.map((movie) => ({ ...movie, id: ++movieId }));

//Create a function to get all movies
export async function getMovies() {
    return [...movies]; //... spreads out all of the elements/take everything in the array
  }

//Create a function to get a particular movie
//define a function that takes in one parameter(the movieId)
export async function getMovieById(movieId) {
//search through the movie array and return the first element with the matching id
  return movies.find(function(movie) {
//access the id of the current movie object being processed by .find, check if it is equal to the movieId
  return movie.id === movieId;
  });
}


//create a function to replace a particular movie to be used with a PUT request
//define a function that takes in two parameters (the movieId, and the replacement)
export function replaceMovieById(movieId, movieReplacement) {
    //declare a new variable index, which uses findIndex() to return the index of the required movie
    const index = movies.findIndex(({ id}) => id === movieId);
    //This is used to locate the index of the movie based on it's id. { id } extracts the id property from the movie. id === movieId checks if the id matches movieId. The result is stored in a variable.
    if (index === -1) {
        return;
    }
    //declare a new variable newMovie = {...movieReplacement, id: movieId}
    const newMovie = { ...movieReplacement, id: movieId };

    //using index variable and slice method to insert new movie at desired index.
    movies = [
        ...movies.slice(0, index),
        newMovie,
        ...movies.slice(index + 1),
    ];

    //return newMovie.
    return newMovie;
}