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
  return movies.find(function (movie) {
    //access the id of the current movie object being processed by .find, check if it is equal to the movieId
    return movie.id === movieId;
  });
}

//Support function to find the movie index within the array
function findMovieIndexById(movieId) {
  return movies.findIndex(({ id }) => id === movieId);
}

//Function we will use for the request with id of the interested movie and updates to be made
export async function updateMovieById(movieId, updates) {
  const index = findMovieIndexById(movieId);
  //Handle the error in case of wrong id and avoid the system crash
  if (index === -1) {
    return;
  }
  //Update the object
  const oldMovie = movies[index];
  const updated = { ...oldMovie, ...updates, id: movieId };

  movies = [...movies.slice(0, index), updated, ...movies.slice(index + 1)];
  //Return the updated movie
  return updated;
}
