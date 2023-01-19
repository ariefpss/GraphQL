const express = require('express');
const grahpqlExprs = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const schema = require('./API/SchemaApp');
const chekAuth = require('./API/Middleware/chekauth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose
    .connect('mongodb://127.0.0.1:27017/graphql',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connect to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use(chekAuth);

app.use('/graphql', grahpqlExprs({
    schema: schema,
    graphiql: true
}));

module.exports = app;