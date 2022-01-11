const { filtrar } = require("../utils/utils");

//inicializacion de variables donde se guardan id y los productos
let operations = [];

const Operation = require("../models/Operation");

const operationsDashboardGet = async (req, res, next) => {
    const operationsDashboard = operations.slice(operations.length - 10)
    const resDashboard = {
        amount: 1000,
        operationsDashboard
    }
    res.json(resDashboard);
};

const operationsOperationsGet = async (req, res, next) => {
    const { offset, limit } = req.body
    const operationsOperation = operations.slice(operations.length - (offset + limit))
    res.json(operationsOperation);

};

const operationsOperationsByIDGet = async (req, res, next) => {
    const idParam = parseInt(req.params.id);
    const filtrado = filtrar(operations, idParam);
    if (filtrado?.httpStatusCode) {
        return next(filtrado);
    }
    res.json(filtrado[0]);

};

//mandar como nombre thumbnail  el campo si se utiliza desde postman la key para el File
const operationsPost = async (req, res, next) => {

    const { description, amount, date, incomeType, category } = req.body;

    const newOperation = new Operation();
    newOperation.createOperation({
        description,
        amount,
        date,
        incomeType,
        category
    });

    operations.push(newOperation);

    // await archivo.crearArchivoYsobreEscribir(rutaProductos, productos);

    return res.json(newOperation);
};

const operationsPut = async (req, res, next) => {

  

    const idParam = parseInt(req.params.id);
    const filtrado = filtrar(operations, idParam);
    if (filtrado?.httpStatusCode) {
        return next(filtrado);
    }

    const { description, amount, date, incomeType, category } = req.body;

    //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
    const descriptionInsert = description ? description : filtrado[0].description;
    const amountInsert = amount ? amount : filtrado[0].amount;
    const dateInsert = date ? date : filtrado[0].date;
    const incomeTypeInsert = incomeType ? incomeType : filtrado[0].incomeType;
    const categoryInsert = category ? category : filtrado[0].category;

    const idAFiltrar = operations.findIndex(
        (contenedor) => contenedor.id == idParam
    );

    operations[idAFiltrar].updateOperation({
        description: descriptionInsert,
        amount: amountInsert,
        date: dateInsert,
        incomeType: incomeTypeInsert,
        category: categoryInsert,
        id: idParam,
    });


    res.json({
        description: descriptionInsert,
        amount: amountInsert,
        date: dateInsert,
        incomeType: incomeTypeInsert,
        category: categoryInsert,
        id: idParam,
    });
};

const operationsDelete = async (req, res, next) => {

    const idParam = parseInt(req.params.id);

    const eliminado = filtrar(operations, idParam);

    if (eliminado?.httpStatusCode) {
        return next(eliminado);
    }
    const todosMenosEliminado = productos.filter(
        (element) => element.id !== idParam
    );
    operations = todosMenosEliminado;
    

    res.json(eliminado[0]);
};

module.exports = {
    operationsDashboardGet,
    operationsOperationsGet,
    operationsOperationsByIDGet,
    operationsPost,
    operationsPut,
    operationsDelete
};