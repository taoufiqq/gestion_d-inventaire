
------------------------------------------------------------------------------------------------------------
|              Création d'une application de gestion d’inventaire avec NodeJS, ExpressJS, EJS et MySQL         |
------------- ----------------------------------------------------------------------------------------------


Firstable go Ampps open server then go to phpmyadmin create database then create table with 3 columns id auto_increment name 
description then follow bellow steps:


Step 1 : open new folder then install  npm init 
			 
		
Step 2 : Install Requred packages using NPM like this ===> 
			==> npm install  express mysql body-parser ejs cors  --save
			
		
Step 3 : Add follwoing code in app.js
                       

		        const express = require('express');
			const path = require('path');
			const ejs = require('ejs');
                        const cors = require('cors');
                        const bodyParser = require('body-parser');
			const mysql = require('mysql');
			const app = express();
                        const PORT = process.env.PORT || 1000
                        
                        
                       

 
                     // 404 handler
                     app.use((req, res, next) => {
                     res.status(404).render('404');
                   });


                   //  Listing Server 
                    app.listen(PORT, () => {
                   console.log('server is rinning')
                   });



			
			
		
		
Step 4 : Create Database Connection 
			const mysql=require('mysql');
			
			const connection=mysql.createConnection({
			  host:'localhost',
			  user:'root',
			  password:'put your massword',
			  database:'put name of your database)'
			});
			
			connection.connect(function(error){
			  if(!!error) console.log(error);
			  else console.log('Database Connected!');
			}); 

Setp 5 : Define view engin with ejs / public path / view files path / bodyParser/express static

			app.use(cors());
                       app.use(bodyParser.urlencoded({ extended: false }));
                       app.use(bodyParser.json());
                       app.use(express.static(path.join(__dirname, "public")));
                       app.use(express.static(path.join(__dirname, "public", "css")));
                       app.use(express.static(path.join(__dirname, )));
                       app.use(require('./route/router'))

                      app.set('view engine', 'ejs');
                      app.set('views', 'views');

Setp 6 : Define index path with '/' and ejs file
			
		
			 route.get('/', (req, res) => {
 const sql = "SELECT produit_id,produit_name,prix,Quantité,Frs_name,Tel,Rayon_name FROM  
             ((produits INNER JOIN fournisseurs ON produits.Frs_id = fournisseurs.Frs_id)
             INNER JOIN rayons ON produits.Rayon_id = rayons.Rayon_id)";
    const query = conn.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('dashboard', {
            ALL: rows
        });

    })

});

Setp 7 : Run a server and check with Browser
			node app

			http://localhost:1000/
			
Step 8 : Get value from database and show in ejs template