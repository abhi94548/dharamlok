require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const mongoString = process.env.DATABASE_URL;

const cookieSession = require("cookie-session");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});


const routes = require('./routes/routes');

app.use('/api', routes);


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
