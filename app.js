const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const privateRouter = require('./routes/private')

dotenv.config();

//Connect to DB
mongoose.connect(
        process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));


app.use(express.json());

app.use("/account/user", authRouter);

app.use('/posts', privateRouter);

app.listen(5000, () => console.log("Server is Up and Running"));