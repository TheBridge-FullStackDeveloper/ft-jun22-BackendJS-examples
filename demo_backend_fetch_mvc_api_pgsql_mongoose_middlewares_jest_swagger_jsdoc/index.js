// Módulos externos
const express = require('express'); // Importando módulo NPM (libería)
require('./utils/dbMongo.js'); // Abrir conexión a la BBDD Mongo

//**SWAGGER */
const swaggerUi = require('swagger-ui-express');//Requiere libreria de Swagger (La UI)
const swaggerDocument = require('./swagger.json'); //Requiere ruta relativa del json que contiene la documentación de la API

//***************** */


// Rutas
const entryRouter = require('./routes/entry');
const productRouter = require('./routes/products');
const productApiRouter = require('./routes/productsApi');

// Middlewares
//const hasApiKey = require('./middlewares/hasApiKey');
const notFound = require('./middlewares/notFound');

const app = express() // Inicializa el servidor. App es un bjeto que representa el server
const port = 3000

// Motor de vistas PUG
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//Endpoint que servirá la documentación en el navegador, se le pasa la variable que apunta al .json que contiene la documentación
app.use(express.json()); // Para habilitar recepción de datos JSON en una request

// app.use(hasApiKey); // Middleware - APIKEY para todas las rutas


// Rutas
app.use("/",productRouter);// WEB products
app.use("/api",entryRouter);// API
app.use("/api",productApiRouter);// API products

// Middleware de rutas inexistentes
app.use(notFound);

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = server;

