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
    replaceMovieById
} from "./helpers.js"

//get request for all movies
app.get("/movies", async function (req, res) {
    const returnedData = await getMovies();
    const allMovies = {
        "success": true,
        "payload": returnedData,
    }
    res.json(allMovies);
})

//get request for a particular movie
//get request with path as /movies:id
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

//put request for replacing a movie
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

//for testing put
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
