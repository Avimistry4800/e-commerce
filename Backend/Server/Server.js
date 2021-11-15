const app = require("../app");

const dotenv = require("dotenv");
const connectDatabase = require("../config/database");


//Uncaught error handler

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Execption");
   process.exit(1);
})

// CONFIG
dotenv.config({ path: "Backend/config/config.env" });

// Connecting to the database
connectDatabase(process.env.DB_URI);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection ");
    server.close(() => {
        process.exit(1); 
    })

});