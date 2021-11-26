const express=require("express");
const router = express.Router()
const{postLogin, getLocation, getCountriesList} = require("../controller/othersController")

router.post('/login', postLogin)

router.get('/location', getLocation)

router.get('/countries', getCountriesList)

module.exports = router