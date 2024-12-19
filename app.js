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
    getMoviesByActor
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



//get request
//path is "/movies"
app.get("/movies", async function (req, res) {
  //specify { name } as query parameter
  const { name } = req.query;

  //use get by name function, with name as parameter, to return movies with that actor
  //store in variable
  const moviesByActor = await getMoviesByActor(name);
  //return in desired format
  res.json({
    success: true,
    payload: moviesByActor
  })
})
//need to comment out the first get request.
//needs to be name as the key in the query