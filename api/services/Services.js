const database = require('../models');

class Services {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async getAllData() {
        return database[this.modelName].findAll();
    };

    async getData(id) {

    }

    async createData(register) {

    }

    async updateData(updatedData, id) {

    }

    async deleteData(id) {

    }
}

module.exports = Services;