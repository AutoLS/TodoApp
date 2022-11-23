require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
import * as https from 'https';
import * as fs from 'fs';

const options = {
    key: fs.readFileSync('./privkey.pem'),
	cert: fs.readFileSync('./fullchain.pem')
};
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/todos', todoRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    https.createServer(options, app).listen(443, () => {
        console.log('connected to db and listening on port 443');
    })
}).catch((error) => {
    console.log(error);
});

