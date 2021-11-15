const express = require("express");
const app = express();
app.use(express.json());

const errorMiddleware = require("./middleware/error");

// Route Imports
const product = require("./routes/productRoute");

app.use("/api/v1", product);

//Middleware fot error handling

app.use(errorMiddleware);




module.exports = app;
