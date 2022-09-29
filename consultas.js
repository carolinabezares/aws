const syncSQL = require('sync-sql');

console.log("Iniciando");


var listaEmpleados;
var empleado;

//Plantilla para hacer una query
// function genericQuery(listaIdProducts) {
//     var query = 'select * from products'
//     try {
//         var results = syncSQL.mysql(conectionProducts, query).data.rows;
//         console.log(results);

//     } catch (error) {
//         console.log("error: ", error);
//     }
// }

//Estableciendo conexion a MySQL. Cambiar por los datos de MySQL
function createConnection() {
    try {
        conectionProducts = {
            host: 'aws.cu3t4bbyrdyq.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: 'carolinabezares06',
            database: 'empleados',
            port: '3306'
        }
        console.log("Conexion exitosa");

    } catch (error) {
        console.log("Error en la conexion");
    }
}

function createEmpleado(req) {
    var nombre = req.nombre;
    var email = req.email;
    var direccion = req.direccion;
    var telefono = parseInt(req.telefono);

    var query = `INSERT INTO empleados.empleados (nombre, email, direccion, telefono) VALUES ('${nombre}', '${email}', '${direccion}','${telefono}')`;
    try {
        var results = syncSQL.mysql(conectionProducts, query).data.rows;
    } catch (error) {
    }
}

function readEmpleado() {
    this.listaEmpleados=[];
    var query = "select * from empleados";
    try {
        var results = syncSQL.mysql(conectionProducts, query).data.rows;
        if (results.length > 0) {
            results.forEach(element => {
                empleado = {};
                empleado["id"] = element['id'];
                empleado["nombre"] = element['nombre'];
                empleado["email"] = element['email'];
                empleado["direccion"] = element['direccion'];
                empleado["telefono"] = element['telefono'];
                this.listaEmpleados.push(empleado);
            });
        } else {
            console.log("no hay datos");
        }

    } catch (error) {
        console.log("error: ", error);
    }
}

function updateEmpleado(req,id) {
    var nombre = req.nombre;
    var email = req.email;
    var direccion = req.direccion;
    var telefono = parseInt(req.telefono);
    var query = `UPDATE empleados.empleados SET nombre='${nombre}', email='${email}', direccion='${direccion}', telefono='${telefono}' where id=${id}`;
    try {
        var results = syncSQL.mysql(conectionProducts, query).data.rows;

    } catch (error) {
        console.log("error: ", error);
    }
}

function deleteEmpleado(id) {
    var query = `DELETE FROM empleados.empleados where id=${id}`;   
    try {
        var results = syncSQL.mysql(conectionProducts, query).data.rows;

    } catch (error) {
        console.log("error: ", error);
    }
}

module.exports = { createConnection, createEmpleado, readEmpleado, updateEmpleado, deleteEmpleado,listaEmpleados }