const database = require('../models');

class Services {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async getAllData(where = {}) {
        return database[this.modelName].findAll({ where: { ...where } });
    };

    async getData(where ={}) {
        return database[this.modelName].findOne({ where: { ...where } });
    }

    async createData(dataToCreate) {
        return database[this.modelName].create(dataToCreate);
    }

    async updateData(dataToUpdate, id, dbTransaction = {}) {
        return database[this.modelName].update(dataToUpdate, { where: { id: id } }, dbTransaction);
    }

    async updateSomeData(dataToUpdate, where, dbTransaction = {}) {
        return database[this.modelName].update(dataToUpdate, { where: { ...where } }, dbTransaction)
    }

    async deleteData(id) {
        return database[this.nomeDoModelo].destroy({ where: { id: id } })
    }

    async findAndCount(where = {}, aggregators) {
        return database[this.modelName].findAndCountAll({ where: {...where }, ...aggregators })
    }

    async restoreData(id) {
        return database[this.modelName].restore({ where: { id: id } })
    }

    async consultDeletedData(id) {
        return database[this.modelName].findOne({ paranoid: false, where: { id: Number(id) } })
    }

}

module.exports = Services;