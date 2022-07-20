// Módulos externos
const express = require('express')
const emoji = require('emoji-whale');
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');
const whale = require('cowsay2/cows/whale');
const fetch = require('node-fetch');

// Tu propio módulo
//const calc = require('./utils/calculator.js');
const calc = require('./utils/calculator');

const app = express()
const port = 3000

// View engine
app.set('view engine', 'pug');
app.set('views','./views');

//Permite leer el body recibido en una petición
app.use(express.json());

// HOME
// http://127.0.0.1:3000
// http://localhost:3000
app.get('/', (req, res) => {
    console.log(emoji);
    console.log(cowsay.say('Hola que tal?', { cow: owl }));
    //res.send('Hola desde mi primer servidor :) !!!!'+emoji)
    let msj = 'Hola desde mi primer servidor :) !!!!'+emoji;
    // res.render("my_view.pug",{section:"Home",msj});
    res.render("my_view",{section:"Home",msj});
})

// http://localhost:3000/pokemon/charmander
// http://localhost:3000/pokemon/mew
// http://localhost:3000/pokemon/pikachu
// http://localhost:3000/pokemon/snorlax

// http://localhost:3000/pokemon
app.get('/pokemon/:name?', (req, res) => {
    console.log(req.params);
    let msj = "";
    if (req.params.name) { // si hay parámetro name
        msj = 'Aquí te envío a:' + req.params.name;
    } else {
        msj = 'Aquí te envío a todos los pokemon del planeta';
    }
    console.log(cowsay.say(msj, { cow: owl })); // Imprime el buho con msj
    //res.send(msj+" "+emoji);
    res.render("my_view",{section:"Pokemon",msj});
})

app.get('/perritos', (req, res) => {
    let msj = "¿cuánto son 2+2?: "+calc.add(2,2);
    console.log(cowsay.say(msj, { cow: owl }));
    let msj2 = 'Aquí te enviaría mis perritos y...'+msj+" "+emoji;
    // res.send('Aquí te enviaría mis perritos y...'+msj+" "+emoji)
    res.render("my_view",{section:"Perritos",msj:msj2});
})

// /products
app.get('/products/:id?', async (req, res) => {
    if (req.params.id) {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
            let products = await response.json(); //{}
            res.render('products', { "products": [products] }); // Pinta datos en el pug
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    } else {
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // []
            let products = await response.json(); // []
            res.render('products', { products }); // Pinta datos en el pug
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    }
});

app.post('/products', async (req, res) => {
    console.log("Esto es el consol.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar

    // Líneas
    //para guardar 
    // en una BBDD SQL o MongoDB

    let response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    let answer = await response.json(); // objeto de vuelta de la petición
    console.log("Este es el console.log de lo que devuelve la api",answer);

    res.send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);
});

app.post("/", (req,res)=>{
    const msj ="Has enviado un POST";
    console.log(msj);
    res.send(msj);
})

app.delete("/", (req,res)=>{
    const msj ="Has enviado un DELETE";
    console.log(msj);
    res.send(msj);
})

app.listen(port, () => {
    console.log(cowsay.say(`Mi servidor funciona en http://localhost:${port}`, { cow: whale }));
})