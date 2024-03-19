import express from 'express';
import cors from 'cors';
import {db} from './database/db.js'
import router from './routes/users.js';
import router2 from './routes/products.js';

// inicializamos la express en una variable
const app = express();

//conexion a la base de datos
db();

//configuramos el cors para que pueda acceder a la api desde cualquier lugar
app.use(cors());

//transforma los objetos en formato urlencoded
app.use(express.urlencoded({ extended: true }));

//transforma los objetos en formato json
app.use(express.json());

//utilizamos las rutas
app.use('/', router )
app.use('/', router2 )

// server listening en el puerto 3000
app.listen(3000, () => { console.log('Server started on port 3000') }); 