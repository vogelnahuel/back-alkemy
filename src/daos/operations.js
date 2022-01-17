const mongoose = require("mongoose");
const moment = require("moment")

const operationsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String, required: true, max: 70 },
  amount: { type: Number, required: true },
  date: { type: String, required: true, max: 70 },
  incomeType: { type: String, required: true, max: 70 },
  category: { type: String, required: true, max: 70 },
});


class OperationDao {
    mongoDB;
    operationsModel;
    constructor() {
      this.mongoDB = `mongodb+srv://nahuel:nahuel@cluster0.4gz4u.mongodb.net/alkemy?retryWrites=true&w=majority`
      mongoose.connect(this.mongoDB);
      this.operationsModel = mongoose.model("operations", operationsSchema);
    }
  
    async get(limit=10,offset=0,all=false) {
      try {
          let  productsList;
          if(all){
             productsList = await this.operationsModel.find()
          }
          else{
             productsList = await this.operationsModel.find().sort({_id:1}).skip(offset).limit(limit);
          }
          
          if (productsList.length == 0)
            throw {
              status: 404,
              msg: "Todavia no hay productos cargados en tu base de datos",
            };
  
          return productsList;
  
      } catch (error) {
        throw error;
      }
    }

  
    async getById(operationId) {
      try {
  
        const getProduct = await this.operationsModel.findById(operationId);
  
        if (!getProduct)
          throw {
            status: 404,
            msg: "El producto solicitado no existe",
          };
        return getProduct;
      } catch (error) {
        throw error;
      }
    }

    async add(data) {
      try {
        const newProduct = {
          _id: new mongoose.Types.ObjectId().toHexString(),
          description: data.description,
          amount: data.amount,
          date: data.date,
          incomeType: data.incomeType,
          category: data.category,
        };
        const addProduct = await this.operationsModel.create(newProduct);
        return addProduct;
      } catch (error) {
        throw error;
      }
    }
  
    async delete(operationId) {
      try {
        await this.operationsModel.deleteOne({ _id: operationId });
      } catch (error) {
        throw error;
      }
    }
  
    async update(operationId, newData) {
      try {
        newData._id = operationId;
        const update = await this.operationsModel.findOneAndUpdate(
          { _id: operationId },
          newData,
          { new: true }
        );
        return update;
      } catch (error) {
        throw error;
      }
    }
  }
  module.exports = OperationDao;