//inicializacion de variables donde se guardan id y los productos

const Operation = require("../models/Operation");
const OperationDao = require("../daos/operations");
const { amountTotal, ErrorCreate } = require("../utils/utils");
const operationDao = new OperationDao();

const operationsDashboardGet = async (req, res, next) => {
  const resDashboard = await operationDao.get();
  let All;
  try {
    All = await operationDao.get(undefined, undefined, true);
  } catch (error) {
    return next(ErrorCreate(error));
  }

  const amountResult = amountTotal(All);

  res.json({ amountResult, operationsDashboard: resDashboard });
};

const operationsOperationsGet = async (req, res, next) => {

  const { offset, limit } = req.query;


  let operationsOperation;
  try {
    operationsOperation = await operationDao.get(parseInt(limit), parseInt(offset));
  } catch (error) {
    return next(ErrorCreate(error));
  }

  res.json(operationsOperation);
};

const operationsOperationsByIDGet = async (req, res, next) => {
  const idParam = req.params.id;
  let operationsOperation;
  try {
    operationsOperation = await operationDao.getById(idParam);
  } catch (error) {
    return next(ErrorCreate(error,"la operacion  no existe"));
  }

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
    category,
  });
  let operation;

  try {
    operation = await operationDao.add(newOperation);
  } catch (error) {
    return next(ErrorCreate(error,"la operacion  no se pudo guardar"));
  }

  return res.json(operation);
};

const operationsPut = async (req, res, next) => {
  const idParam = req.params.id;
  let filtrado;
  try {
    filtrado = await operationDao.getById(idParam);
  } catch (error) {
   
    return next(ErrorCreate(error,"la operacion solicitada no existe"));
  }

  const { description, amount, date, category } = req.body;

  //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
  const descriptionInsert = description ? description : filtrado.description;
  const amountInsert = amount ? amount : filtrado.amount;
  const dateInsert = date ? date : filtrado.date;
  const categoryInsert = category ? category : filtrado.category;

  let update;
  try {
    update = await operationDao.update(idParam, {
      description: descriptionInsert,
      amount: amountInsert,
      date: dateInsert,
      incomeType: filtrado.incomeType,
      category: categoryInsert,
    });
  } catch (error) {
   
    return next(ErrorCreate(error,"no se pudo actualizar"));
  }

  res.json(update);
};

const operationsDelete = async (req, res, next) => {
  const idParam = req.params.id;
  try {
    await operationDao.delete(idParam);
  } catch (error) {
    return next(ErrorCreate(error,"no existe el id"));
  }

  res.json({ text: `eliminado con exito ${idParam}` });
};

module.exports = {
  operationsDashboardGet,
  operationsOperationsGet,
  operationsOperationsByIDGet,
  operationsPost,
  operationsPut,
  operationsDelete,
};
