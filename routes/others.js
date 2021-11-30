const express=require("express");
const router = express.Router()
const{postLogin, getLocation, getCountriesList, getclientinfo} = require("../controller/othersController")

router.post('/login', postLogin)

router.get('/location', getLocation)

router.get('/countries', getCountriesList)

router.get('/getclientinfo', getclientinfo)

module.exports = router