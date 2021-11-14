const app = require("../app");

const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

// CONFIG
dotenv.config({ path: "Backend/config/config.env" });

// Connecting to the database
connectDatabase(process.env.DB_URI);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
