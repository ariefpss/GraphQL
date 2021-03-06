const express = require('express');
const grahpqlExprs = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const schema = require('./API/SchemaApp');
const chekAuth = require('./API/Middleware/chekauth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(
    'mongodb://localhost:27017/graphql',
    {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true,},
    () => {
        console.log("Successfully connect database");   
    }
);

app.use(chekAuth);

app.use('/graphql', grahpqlExprs({
    schema: schema,
    graphiql: true
}));

module.exports = app;