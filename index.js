const express = require('express');
const hbs = require('express-hbs');
const morgan = require('morgan');
const admin = require('firebase-admin');
const Swal = require('sweetalert2');
const bodyParser = require('body-parser');


const app = express();

const con = require('./consultas');

con.createConnection();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');



app.post('/agregar',(req,res) => {
    con.createEmpleado(req.body);
    res.redirect('/lista');
});

app.get('/lista',(req,res) => {
    con.readEmpleado();
    var json_string = JSON.parse(JSON.stringify(con.listaEmpleados));
    res.json(json_string);
});

app.put('/actualizar/:id',(req,res) => {
    const { id } = req.params;
    con.updateEmpleado(req.body,id);
    res.redirect('/lista');
});

app.delete('/eliminar/:id',(req,res) => {
    const { id } = req.params;
    con.deleteEmpleado(id);
    res.redirect('/lista');
});



const port = process.env.port || 8015;
console.log(port);
app.listen(port, () => console.log(`Escuchando en puerto ${port}`));


