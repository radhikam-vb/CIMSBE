// import dotenv from "dotenv"
const express = require("express");
const cors = require("cors");
const cimsRouter = require("./routes/cims");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const countries = require('country-state-picker');
const fetch = require('node-fetch')
const { locationSchema } = require('./schema/cimsSchema')
const { customResponse } = require("./utility/helper");

// dotenv.config()
const port = process.env.PORT || 4000
const db = "mongodb+srv://dbUser:dbUserPassword@cluster0.4csc4.mongodb.net/ERP?retryWrites=true&w=majority"
mongoose.connect(db).then(() =>
    console.log("Connection Successfull")
).catch((err) => console.log('err'))

const app = express()
const TOKEN_SECRET = '6850cc6ab29180f03f647c9b7ff331298038b2cd9bf71980f87bfd547e0da37ac60c4c5d7f7136f81b81496a741f496ea3e528b70755bcf020874e0ef01446db'

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/cims', cimsRouter)

app.post('/login', (req, res) => {
    const username = req.body.username
    var user = { name: username }

    if (username == null) user = { name: "Dummy username" }

    const token = jsonwebtoken.sign(user, TOKEN_SECRET, { expiresIn: '3600s' })
    res.json({ Token: token })
})

app.get('/location', async (req, res) => {
    const pincode = req.headers.pincode
    const country = req.headers.country
    try {
        const { error } = locationSchema.validate(req.headers)
        if (error) {
            code = 422;
            message = "Invalid request data";
            const resData = customResponse({
                code,
                message,
                err: error && error.details,
            });
            return res.status(code).send(resData);
        }

        const url = `https://api.worldpostallocations.com/pincode?postalcode=${pincode}&countrycode=${country}`
        const fetch_res = await fetch(url)

        const location = await fetch_res.json()

        try {
            const state = location.result[0].state
            const districts = location.result.reduce(function (res, curr) {
                res[curr.district] = res[curr.district] || []
                res[curr.district].push(curr.postalLocation)
                return res
            }, {})

            const data = new Object({
                state,
                districts
            })
            res.json(data)
        } catch (err) {
            code = 422;
            message = "Invalid request data";
            const resData = customResponse({
                code,
                message,
                err: [{
                    message: "The pincode doesnt exist"
                }],
            });
            return res.status(code).send(resData);
        }
    } catch (err) {
        console.log(err)
    }
})

app.get('/countries', async (req, res) => {
    const countriesList = countries.getCountries()
    res.json(countriesList)
})

app.use('/', (req, res) => {
    res.send("HomePage")
})

app.listen(port, () => console.log("Server running on 4000..."))
module.exports = app;