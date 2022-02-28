const Services = require('./Services');
const database = require('../models');

class PeopleServices extends Services {
    constructor() {
        super('Person')
        this.registrations = new Services('Registration')
    }

    async getAllActivePeople(where = {}, order, page, size) {
        const req_limit = size;
        const req_offset = size * page;
        const conditions = {where: {...where}, order: order, limit: req_limit, offset: req_offset};
        return database[this.modelName].findAndCountAll({ ...conditions });
    }
    
    async getAll(where = {}, order, page, size) {
        const req_limit = size;
        const req_offset = size * page;
        const conditions = {where: {...where}, order: order, limit: req_limit, offset: req_offset};
        return database[this.modelName].scope('all').findAndCountAll({ ...conditions })
    }

    async cancelPersonAndRegistrations(studentId) {
        return database.sequelize.transaction(async dbTransaction => {
            await super.updateData({ active: false }, studentId, { transaction: dbTransaction });
            await this.registrations.updateSomeData({ status: 'cancelado' }, { student_id: studentId }, { transaction: dbTransaction });
        });
    }

    async getStudentRegistrations(where ={}) {
        const registrations = await database[this.modelName].findOne({ where: { ...where } } );
        return registrations.getConfirmedRegistrations();
    }
    
}

module.exports = PeopleServices;