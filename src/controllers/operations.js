
//inicializacion de variables donde se guardan id y los productos

const Operation = require("../models/Operation");
const OperationDao = require('../daos/operations')
const {amountTotal} = require('../utils/utils')
const operationDao = new OperationDao();

const operationsDashboardGet = async (req, res, next) => {
    const resDashboard = await operationDao.get();
    const All = await operationDao.get(undefined,undefined,true);
    const amountResult = amountTotal(All);

    res.json({amountResult,operationsDashboard:resDashboard});
};

const operationsOperationsGet = async (req, res, next) => {
    const { offset, limit } = req.body
    const operationsOperation = await operationDao.get(limit,offset)
    res.json(operationsOperation);

};

const operationsOperationsByIDGet = async (req, res, next) => {
    const idParam = req.params.id;
    const operationsOperation = await operationDao.getById(idParam)
    res.json(operationsOperation);
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

    const operation = await operationDao.add(newOperation)

    return res.json(operation);
};

const operationsPut = async (req, res, next) => {

    const idParam = req.params.id;

    const filtrado = await operationDao.getById(idParam)

    const { description, amount, date, category } = req.body;

    //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
    const descriptionInsert = description ? description : filtrado[0].description;
    const amountInsert = amount ? amount : filtrado[0].amount;
    const dateInsert = date ? date : filtrado[0].date;
    const categoryInsert = category ? category : filtrado[0].category;


    const update = await operationDao.update(idParam,{
        description: descriptionInsert,
        amount: amountInsert,
        date: dateInsert,
        incomeType:  filtrado[0].incomeType,
        category: categoryInsert,
    })

    res.json(update);
};

const operationsDelete = async (req, res, next) => {

  const idParam = req.params.id;
  await operationDao.delete(idParam);
  res.json({text:`eliminado con exito ${idParam}`})

};

module.exports = {
    operationsDashboardGet,
    operationsOperationsGet,
    operationsOperationsByIDGet,
    operationsPost,
    operationsPut,
    operationsDelete
};