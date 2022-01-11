class Operation {
    constructor() {
      this.description = "";
      this.amount = 0;
      this.date = "";
      this.incomeType = "";
      this.category = "";
    }
    static id = 0;
    createOperation (obj) {
        this.description = obj.description;
        this.amount =  obj.amount;
        this.date =  obj.date;
        this.incomeType = obj.incomeType;
        this.category =  obj.category;
      Operation.id++;
      this.id = Operation.id;
    }
  
    updateOperation(obj) {
        this.description = obj.description;
        this.amount =  obj.amount;
        this.date =  obj.date;
        this.incomeType = obj.incomeType;
        this.category =  obj.category;
        this.id = obj.id;
    }
  }
  module.exports = Operation;