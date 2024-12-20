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


//create a function to get all movies containing an actors name
//the parameter is a "search"
export async function getMoviesByActor(search) {
    //use toLowerCase function on search parameter and return so it is not case sensitive.
    const actor = search.toLowerCase();
    // use filter, split and includes to return movies containing search string.
    return movies.filter(movie => movie.stars.toLowerCase().split(", ").includes(actor))
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

 /*  //search through the movie array and return the first element with the matching id
  return movies.find(function (movie) {
    //access the id of the current movie object being processed by .find, check if it is equal to the movieId
    return movie.id === movieId;
  }); */
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

//Create a function to add a new movie
export async function addMovie(newMovie) {
  //Create the object with all the properties. Increase the id +1
  const created = {
    ...newMovie,
    id: ++movieId,
  };
  //Attach the new movie object to the movies database array
  movies = [...movies, created];
  //Return the new movie object
  return created;
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

