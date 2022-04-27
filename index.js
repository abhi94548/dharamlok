require('dotenv').config();

import express, { json, urlencoded } from 'express';
import { connect, connection } from 'mongoose';
import cors from "cors";
import routes from './routes/routes';
const mongoString = process.env.DATABASE_URL;

connect(mongoString);
const database = connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.use('/api', routes);


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
