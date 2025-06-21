import express from 'express';
import dotenv from 'dotenv';
import initDB from './config/database.js';
import productrouters from //HACER LO DE ROUTERRRR PUNTO 4

dotenv.config();

initDB()

const app= express()
const PORT = process.env.PORT || 3000;

app.use(express());
app.listen (PORT, ()=> console.log("Server runnings on localhost" + PORT));
