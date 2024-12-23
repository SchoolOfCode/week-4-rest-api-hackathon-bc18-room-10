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


import {
    getMovies,
    getMovieById,
    getMoviesByActor,
    replaceMovieById,
    addMovie,
    deleteMovieByID,
    updateMovieById
} from "./helpers.js"


//get request for all movies
/* app.get("/movies", async function (req, res) {
    const returnedData = await getMovies();
    const allMovies = {
        "success": true,
        "payload": returnedData,
    }
    res.json(allMovies);
}) */

//get request for a particular movie

//get request with path as /movies/:id
app.get("/movies/:id", async function (req,res){
    //delcare the id and make sure we change the id to a number
    //use the getMoviebyId function with one parameter
    const returnedData = await getMovieById(Number(req.params.id))
    //create a success/payload object to store the function
    const movieByID = {
        "success": true,
        "payload": returnedData,
    }
    //respond to the client with the specific movie
    res.json(movieByID);
})



//get request
//path is "/movies"
app.get("/movies", async function (req, res) {
  const { name } = req.query;

  
  const moviesByActor = await getMoviesByActor(name);
  res.json({
    success: true,
    payload: moviesByActor
  })
})
//need to comment out the first get request.
//needs to be name as the key in the query


//delete request
//use delete request with path "/movies/:id"
app.delete("/movies/:id", async function (req,res){
//specify the id of the movie to delete
const movieId = (Number(req.params.id));
//use the deleteMoviesById(movieId) function
const deletedMovie = await deleteMovieByID(movieId);
//use success/payload to return the astronaut chosen to be deleted

//if the deletedMovie does not match an id return false and movie not found
if (!deletedMovie) {
    res.status(404).json ({
      success: false,
      message: "Movie not found"
  })
  return }

const deletedData = {
    "success": true,
    "payload": deletedMovie,
  }
//respond to the client
res.json(deletedData);
})


//post request for a new movie
app.post("/movies", async function (req, res) {
  //store in a variable the data from the new movie object that will be returned by the addMovie function
  const newMovieData = await addMovie(req.body);
  //JSON response with JSend specification
  const movieInfo = {
    success: true,
    payload: newMovieData,
  };
  //send a 201 status code for the newly created resource
  res.status(201).json(movieInfo);
});

//put request with path /movies/:id 
app.put("/movies/:id", async function (req, res) {
  //specify an id and store in variable. req.params
  const movieId = Number(req.params.id);
  //store movie replacement in a variable, from the body of the request.
  const movieReplacement = req.body;
  // use replace function with id and replacement parameters
  // create variable to store new data
  const replacementData = await replaceMovieById(movieId, movieReplacement);
  //repsond in desired format.
  const replacedMovie = {
    "success": true,
    "payload": replacementData,
  }
  res.json(replacedMovie);
})


//Patch request to update a movie with a specific id
app.patch("/movies/:id", async function (req, res) {
  //Store the updated data in a variable
  const movieId = Number(req.params.id);
  console.log(movieId)
  const movieUpdate = req.body;
  const updatedData = await updateMovieById(movieId, movieUpdate);
  //Store the updated movie with JSend specification
  const updatedMovie = {
    "success": true,
    "payload": updatedData,
  };
  res.status(200).json(updatedMovie);
});


//for testing put, post and patch
/* {
  "title": "Star Wars",
  "rating": "-",
  "runtime": 100,
  "imdb_rating": 10,
  "votes": 999,
  "genre": "Sci-fi, Adventure",
  "release_year": 1977,
  "description": "it's star wars",
  "director": "George Lucas",
  "stars": "Mark Hamill, Carrie Fisher, Harrison Ford",
  "gross": ""
} */
