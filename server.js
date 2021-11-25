// import dotenv from "dotenv"
const express=require("express");
const cors=require("cors");
const cimsRouter=require("./routes/cims");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const jsonwebtoken=require("jsonwebtoken");


// dotenv.config()
const port=process.env.PORT || 4000
const db = "mongodb+srv://dbUser:dbUserPassword@cluster0.4csc4.mongodb.net/ERP?retryWrites=true&w=majority"
mongoose.connect(db).then(() =>
    console.log("Connection Successfull")
).catch((err) => console.log('err'))

const app = express()
const TOKEN_SECRET = '6850cc6ab29180f03f647c9b7ff331298038b2cd9bf71980f87bfd547e0da37ac60c4c5d7f7136f81b81496a741f496ea3e528b70755bcf020874e0ef01446db'

app.use(cors()) 
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/cims', cimsRouter)

app.post('/login', (req, res)=>{
    const username = req.body.username
    var user = {name: username}

if(username == null) user = {name : "Dummy username"}

const token = jsonwebtoken.sign(user,TOKEN_SECRET, {expiresIn: '3600s'})
    res.json({ Token: token})
})

app.use('/', (req, res) => {
    res.send("HomePage")
})

app.listen(port, () => console.log("Server running on 4000..."))
module.exports=app;