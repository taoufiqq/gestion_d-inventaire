const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const PORT = process.env.PORT || 1000


const app = express();





app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "css")));
app.use(express.static(path.join(__dirname, )));
app.use(express.static(path.join(__dirname, "image")));
app.use(require('./route/router'))



app.set('view engine', 'ejs');
app.set('views', 'views');

 
// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});


//  Listing Server 
app.listen(PORT, () => {
    console.log('server is rinning')
});