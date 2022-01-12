const express = require("express");

const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.app.use(cors({origin: '*'}));
    this.port = process.env.PORT;
    this.operationsPath = "/api/operations";
    
    //Middlewares
    this.middlewares();

    //Rutas de mi app
    this.routes();
  

  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    //parseo y lectura del body de lo que mande el front en cualquier verbo http
    this.app.use(express.json());
    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.operationsPath, require("../routes/operations"));

    //ruta por defecto en caso de no encontrarse
    this.app.all("*", (req, res) => {
      res
        .status(404)
        .json({ error: -2, descripcion:`ruta ${req.url} y  método  ${req.method} no implementados` });
    });

  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto:" + this.port);
    });
  }
}
module.exports = Server;