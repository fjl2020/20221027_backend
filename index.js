const express=require('express')
var cors = require('cors')
require('dotenv').config();
const {dbConnection} = require('./database/config.js')
//crear servidor
const app = express();

//configurar cors

app.use(cors())

//base de datos

dbConnection();
console.log()
//rutas
app.get('/',(req,res)=>{
    res.status(200).json({
        ok:true,
        msg:'hola mundo'
    })
});
dbConnection
app.listen( process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

// mongodb+srv://fer_auth:ngRc7PJT2reKiyl0@cluster0.phlihig.mongodb.net/test