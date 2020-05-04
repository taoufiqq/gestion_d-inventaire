const express =require('express');
const route = express.Router();
const mysql = require('mysql')


// ======== Connected NodeJS via MySQL========
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'supermarket'
});

conn.connect(function (error) {
    if (!!error) console.log(error);
    else console.log('Connected! :)')
});







       // -------------------------------------------Dashboard-------------------------------



  route.get('/', (req, res) => {
 const sql = "SELECT produit_id,produit_name,prix,Quantité,Frs_name,Tel,Rayon_name FROM  ((produits INNER JOIN fournisseurs ON produits.Frs_id = fournisseurs.Frs_id) INNER JOIN rayons ON produits.Rayon_id = rayons.Rayon_id)";
    const query = conn.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('dashboard', {
            ALL: rows
        });

    })

});




// ------------------------------------- display all products-------------------------------


route.get('/produc', (req, res, next) => {
    const sql = "SELECT * FROM produits";
    const query = conn.query(sql, (err, rows) => {
        if (err) throw err;

          
           res.json(rows);
       
         
    })
})







route.get('/product', (req, res, next) => {
    const sql = "SELECT * FROM produits";
    const query = conn.query(sql, (err, rows) => {
        if (err) throw err;


        res.render('products', {
            prods: rows
        });
         
    })
})

     // ------------------------------------- Caissier -------------------------------

  route.get('/caisse', (req, res) => {
     const sql = "SELECT * FROM produits";
    const query = conn.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('caissier', {
            prods: rows
        });

    })
});
    route.post('/caisse', (req, res) => {
     
     console.log(req.body)
     let proId = req.body.produit_id

    let sql = "Update produits SET Quantité= Quantité -'" + req.body.Quantité + "' where produit_id =" + proId;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/caisse');
    });

});







// --------------------------------------add products----------------------------------------
route.get('/add', (req, res) => {
    

    const sql = "SELECT * FROM fournisseurs";
    const sqll = "SELECT * FROM rayons";
    const query = conn.query(sql, (err, rows) => {
    	const query = conn.query(sqll, (err, rows2) => {
        if (err) throw err;
        res.render('addPage', {
            frs: rows,
            ray: rows2,
        });
          });
    })
      

});

route.post('/save', (req, res) => {
	console.log(req.body)

     const a = parseInt(req.body.prix);  
     const b = parseInt(req.body.Quantité);
     const pr=a*b;
 
    const data = {
        produit_name: req.body.produit_name,
        prix: pr,
        Quantité: req.body.Quantité,
        Frs_id:req.body.Frs_id,
        Rayon_id:req.body.Rayon_id,

    };
    const sql = "INSERT INTO produits SET ?";
    const query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/product');
    });
});

//--------------------------------------Edit products ------------------------------------
route.get('/edit/:proId', (req, res) => {
    const proId = req.params.proId;
    let sql = `Select * from produits where produit_id = ${proId}`;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('editPage', {
            pro: result[0]
        });
    });
});

route.post('/update', (req, res) => {

    let proId = req.body.produit_id

    let sql = "Update produits SET  produit_name='" + req.body.produit_name + "', prix='" + req.body.prix + "', Quantité='" + req.body.Quantité + "' where produit_id =" + proId;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/product');
    });
});

//-----------------------------------------------Delete products------------------------------------------
route.get('/delete/:proId', (req, res) => {
    const proId = req.params.proId;
    let sql = `DELETE from produits where produit_id = ${proId}`;
    let query = conn.query(sql, (err, result) => {
        if (err)
            throw err;
        res.redirect('/product');
    });
});





//-----------------------------------------------Display all rayons------------------------------------------



route.get('/rayon', (req, res, next) => {
    const sql = "SELECT * FROM rayons";
    const query = conn.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('rayons', {
            rys: rows
        });

    });
});

//-----------------------------------------------Add rayons------------------------------------------



route.get('/addRayon', (req, res) => {
        res.render('addRayon');
       
});


//-----------------------------------------------save rayons------------------------------------------

route.post('/savery', (req, res) => {
    console.log(req.body)
    const data = {
        Rayon_name: req.body.Rayon_name

    };
    const sql = "INSERT INTO rayons SET ?";
    const query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/rayon');
    });
});


//--------------------------------------Edit rayon ------------------------------------
route.get('/editry/:ryId', (req, res) => {
    const ryId = req.params.ryId;
    let sql = `Select * from rayons where Rayon_id = ${ryId}`;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('editry', {
            ry: result[0]
        });
    });
});

route.post('/updatery', (req, res) => {

    let ryId = req.body.Rayon_id

    let sql = "Update rayons SET  Rayon_name='" + req.body.Rayon_name  + "' where Rayon_id =" + ryId;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/rayon');
    });
});

//-----------------------------------------------Delete products------------------------------------------
route.get('/deletery/:ryId', (req, res) => {
    const ryId = req.params.ryId;
    let sql = `DELETE from rayons where Rayon_id = ${ryId}`;
    let query = conn.query(sql, (err, result) => {
        if (err)
            throw err;
        res.redirect('/rayon');
    });
});

















//-----------------------------------------------Display all suppliers------------------------------------------




route.get('/fournisseur', (req, res, next) => {
    const sql = "SELECT * FROM fournisseurs";
    const query = conn.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('fournisseurs', {
            frs: rows
        });

    });
});

//-----------------------------------------------  Add suppliers------------------------------------------

route.get('/addFournisseur', (req, res) => {
    res.render('addFournisseur');
   
});
route.post('/savefr', (req, res) => {

const data = {
    Frs_name: req.body.Frs_name,
    Société: req.body.Société,
    Address: req.body.Address,
    Tel: req.body.Tel,
    Email: req.body.Email

};
const sql = "INSERT INTO fournisseurs SET ?";
const query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/addFournisseur');
});
});




//--------------------------------------Edit FRS ------------------------------------
route.get('/editfr/:frId', (req, res) => {
    const frId = req.params.frId;
    let sql = `Select * from fournisseurs where Frs_id = ${frId}`;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('editfr', {
            fr: result[0]
        });
    });
});

route.post('/updatefr', (req, res) => {

    let frId = req.body.Frs_id

    let sql = "Update fournisseurs SET  Frs_name='" + req.body.Frs_name +"' , Société = '" + req.body.Société +"' , Address='" + req.body.Address + "', Tel='" + req.body.Tel + "', Email='" + req.body.Email + "'  where Frs_id ="+ frId;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/fournisseur');
    });
});

//-----------------------------------------------Delete FRS------------------------------------------
route.get('/deletery/:frId', (req, res) => {
    const frId = req.params.frId;
    let sql = `DELETE from fournisseurs where Frs_id = ${ryId}`;
    let query = conn.query(sql, (err, result) => {
        if (err)
            throw err;
        res.redirect('/fournisseur');
    });
});









































module.exports = route;
