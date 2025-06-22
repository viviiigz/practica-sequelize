//Estas lineas son importaciones iniciales, som los modulos y archivos externos que voy a usar
import express from 'express';
import dotenv from 'dotenv';
import initDB from './src/config/db.js';
import productRouters from './src/routers/product.routes.js'//HACER LO DE ROUTERRRR PUNTO 4
import userRouters from './src/routers/user.routes.js'

dotenv.config();//llama a la funcion config de dotenv
//carfa todas las vaariables defibidas en el archivo .env 


const app= express(); // instancia de aplicacion express 
const PORT = process.env.PORT || 3000;
app.use(express.json());


// //routers
app.get('/',(req,res)=> res.json({ok: 'true'}))
app.use("/products",productRouters);
app.use("/users", userRouters);

app.listen (PORT, ()=> console.log("Server runnings on http://localhost:" + PORT));


initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});

