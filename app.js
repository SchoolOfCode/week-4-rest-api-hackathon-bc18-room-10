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
    getMovies
} from "./helpers.js"

app.get("/movies", async function (req, res) {
    const returnedData = await getMovies();
    const allMovies = {
        "success": true,
        "payload": returnedData,
    }
    res.json(allMovies);
})
