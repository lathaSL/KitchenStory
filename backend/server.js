const express = require('express');
const bodyParser = require('body-parser');
//for api requests from angular app cors module needs to be installed and imported here.
const cors = require('cors')

const mongoose = require('./db.js')
// here mongoose is imported for database file and not package.json file

//need routes to be imported here.
const routes = require('./routes/routes.js')
const userroutes = require('./routes/userroutes.js')

const app = express();

app.use(bodyParser.json())

// this is path of angular application
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(3000, () => {
    console.log("Server started at port 3000")
})

app.use('/fooditem', routes)
app.use('/user', userroutes)