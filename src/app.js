//Requirements
require('dotenv').config()
require('../config/database');
const port=process.env.PORT || 4005; /*Run on given value port, or 4005 if none given */
const express = require("express");
const app = express();
const path= require('path');

//JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))


//EJS
app.set("views",path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use("", require("./routes/userRouter"));

//catch all route for (404)
app.use((req, res, next) => {
    let error = new Error();
    error.status = 404;
    error.message = "Resource not found";
    next(error);
});
  
//Error handler
app.use((error, req, res, next) => {
    if (!error.status) {
        error.status = 500;
        error.message = "Internal Error Server"
    };
    res.status(error.status).json({ status: error.status, message: error.message })
});

//Port
app.listen(port,(err)=>{
    err? console.log(`Error: ${err}`): console.log(`Running on port http://localhost:${port}`);
});   