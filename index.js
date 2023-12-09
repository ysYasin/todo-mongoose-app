const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require('./todoHandler/todoHandler')
const port = process.env.PORT || 4530
const app = express();
require("dotenv").config();
app.use(express.json());

// mongoose OBject
const Uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.kx3y6hq.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(Uri)
    .then(() => { console.log('mongoose connected') })
    .catch((err) => { console.log(err) })

app.use('/todo', todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        next(err)
    }
    res.status(500).json({
        error: err
    })
}

app.listen(port, () => {
    console.log(`server is listening from ${port}`);
})