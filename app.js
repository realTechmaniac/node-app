const http         = require('http');
const BodyParser   = require('body-parser');
const adminRoutes  = require('./Routes/admin');
const shopRoutes   = require('./Routes/shop');
const path         = require('path');
const errorsController = require('./controllers/error');

//import express::
const express = require('express');

//create an express application::
const app  = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

//Use Body parser to extract the request body:
app.use(BodyParser.urlencoded({extended:false}));

//serve static files here::
app.use(express.static(path.join(__dirname, 'public')));

//Bring in the admin routes::
app.use('/admin', adminRoutes);

//Bring in the shop Routes
app.use(shopRoutes);

//handle 404 page
app.use(errorsController.get404Page);

app.listen(3002);
