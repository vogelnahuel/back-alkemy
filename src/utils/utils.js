
const amountTotal = (array) => {
  let amountTotal=0;



  array.forEach(element => {
      if(element.incomeType==="ingreso"){

        amountTotal+=element.amount;
      }
      else{
        amountTotal-=element.amount;
      }
  });

  return amountTotal;
}

// const filtrar = (array, idParam) => {
//   if (array === undefined || array.length === 0) {
//     const error = new Error("elemento  no encontrado");
//     error.httpStatusCode = 404;
//     return error;
//   }
//   const filtrado = array.filter((array) => array.id === idParam);
//   if (filtrado.length === 0) {
//     const error = new Error("elemento  no encontrado");
//     error.httpStatusCode = 404;
//     return error;
//   }
//   return filtrado;
// };



// const isAdmin = (req, res, next) => {

//   let administrador = req.headers?.administrador;

//   administrador = administrador ? JSON.parse(administrador) : false ;

//   if (!administrador) {

//     res
//       .status(404)
//       .send({ error: -1, descripcion: `ruta ${req.originalUrl} y  método  ${req.method} no autorizada` });
//   }
//   else {
//     next();
//   }

// }

module.exports = { amountTotal };