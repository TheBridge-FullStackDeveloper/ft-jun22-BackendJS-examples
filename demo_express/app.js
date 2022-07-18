const express = require('express')
const app = express()
const port = 3001

// HOME
// http://127.0.0.1:3000
// http://localhost:3000
app.get('/', (req, res) => {
    res.send('Hola desde mi primer servidor!')
})

// http://localhost:3000/pokemon/charmander
// http://localhost:3000/pokemon/mew
// http://localhost:3000/pokemon/pikachu
// http://localhost:3000/pokemon/snorlax
app.get('/pokemon/:name?', (req, res) => {
    console.log(req.params);
    if (req.params.name) {
        res.send('Aquí te envío a:' + req.params.name)
    } else {
        res.send('Aquí te envío a todos los pokemon del planeta')
    }
})

app.get('/perritos', (req, res) => {
    res.send('Aquí te enviaría mis perritos')
})


app.listen(port, () => {
    console.log(`Mi servidor funciona en el puerto ${port}`)
})