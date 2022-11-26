require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/users');
const https = require('https');
const cors = require('cors');
var fs = require('fs');

const startup_args = process.argv.slice(2);
const deploy_arg = startup_args[0];

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    if(deploy_arg === 'deploy')
    {
        const options = {
            key: fs.readFileSync('./privkey.pem'),
            cert: fs.readFileSync('./fullchain.pem')
        };

        https.createServer(options, app).listen(process.env.PORT, () => {
            console.log('Created deployment server, connected to db and listening on port', process.env.PORT);
        });
    }
    else
    {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT);
        });
    }
    
}).catch((error) => {
    console.log(error);
});

