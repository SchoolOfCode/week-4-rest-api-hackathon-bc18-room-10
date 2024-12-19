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
//search through the movie array and return the first element with the matching id //access the id of the current movie object being processed by .find
  return movies.find(function(movie) {
// check if it is equal to the movieId
  return movie.id === movieId;
  });
}

//Create a function to delete a particular movie
//define a deleteMovieByID function
//the function needs to take in the movieId of the movie you want to delete
export async function deleteMovieByID(movieId) {
//find the index in the movies array with the id of the matching movieId
const movieIndex = movies.findIndex(function(movie) {
  return movie.id === movieId;
});
//if the movie index is found, delete the move
if(movieIndex != -1) { //-1 used because the index could be 0
  const deletedMovie = movies[movieIndex];
  //Use splice to remove the movie from the array
movies.splice(movieIndex, 1)
  //return an array containing the deleted movie
  return deletedMovie;
}
//if no movie is found return null
else {
  return null;
}
}
