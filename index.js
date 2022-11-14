const express=require('express')
var cors = require('cors')
require('dotenv').config();
const {dbConnection} = require('./database/config.js')
//crear servidor
const app = express();

//configurar cors

app.use(cors())

// lectura y parse del body

app.use(express.json());

//base de datos

//directorio publico
app.use(express.static('public'))

dbConnection();
console.log()
//rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/auth',require('./routes/auth'));

app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/todo'));
app.use('/api/uploads',require('./routes/upload'));

dbConnection
app.listen( process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

