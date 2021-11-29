// import dotenv from "dotenv"
const express = require("express");
const cors = require("cors");
const cimsRouter = require("./routes/cims");
const othersRouter = require("./routes/others")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


// dotenv.config()
const port = process.env.PORT || 4000
const db = "mongodb+srv://dbUser:dbUserPassword@cluster0.4csc4.mongodb.net/ERP?retryWrites=true&w=majority"
mongoose.connect(db).then(() =>
    console.log("Connection Successfull")
).catch((err) => console.log('err'))

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/cims', cimsRouter)

app.use('/', othersRouter)

app.listen(port, () => console.log("Server running on 4000..."))
module.exports = app;