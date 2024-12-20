// Import the express module which is a web framework for Node.js
import express from "express";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and make it available under req.body
app.use(express.json());

// Export the app instance so it can be used in other files
export default app;

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

import { getMovies, getMovieById, updateMovieById } from "./helpers.js";

//get request for all movies
app.get("/movies", async function (req, res) {
  const returnedData = await getMovies();
  const allMovies = {
    success: true,
    payload: returnedData,
  };
  res.json(allMovies);
});

//get request for a particular movie
//get request with path as /movies:id
app.get("/movies/:id", async function (req, res) {
  //delcare the id and make sure we change the id to a number
  //use the getMoviebyId function with one parameter
  const returnedData = await getMovieById(Number(req.params.id));
  //create a success/payload object to store the function
  const movieByID = {
    success: true,
    payload: returnedData,
  };
  //respond to the client with the specific movie
  res.json(movieByID);
});

//Patch request to update a movie with a specific id
app.patch("movies/:id", async function (req, res) {
  //Store the updated data in a variable
  const updatedData = await updateMovieById(Number(req.params.id), req.body);
  //Store the updated movie with JSend specification
  const updatedMovie = {
    success: true,
    payload: updatedData,
  };
  res.json(updatedMovie);
});
