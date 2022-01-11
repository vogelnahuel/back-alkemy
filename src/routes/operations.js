
const { Router } = require("express");

const {
    operationsDashboardGet,
    operationsOperationsGet,
    operationsOperationsByIDGet, 
    operationsPost,
    operationsPut,
    operationsDelete

} = require("../controllers/operations");

const routerOperations = Router();



routerOperations.get("/dashboard", operationsDashboardGet);

routerOperations.get("/operations", operationsOperationsGet);

routerOperations.get("/:id/operations", operationsOperationsByIDGet);


routerOperations.post("/", operationsPost);

routerOperations.put("/:id", operationsPut);

routerOperations.delete("/:id", operationsDelete);


module.exports = routerOperations;