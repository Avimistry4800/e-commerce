const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then((data) => {
            console.log(
                `Mongodb Connected with server:${data.connection.host}`
            );
        })
        .catch((err) => {
            console.log(`Mongodb Connection Error:${err}`);
        });
};
module.exports = connectDatabase;
