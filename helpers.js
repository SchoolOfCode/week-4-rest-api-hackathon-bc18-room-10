import { data } from "./data.js";

let movieId = 0;
let movies = data.map((movie) => ({ ...movie, id: ++movieId }));

//Create a function to get all movies
export async function getMovies() {
    return [...movies]; //... spreads out all of the elements/take everything in the array
  }
