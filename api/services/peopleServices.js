const Services = require('./Services');
const database = require('../models');

class PeopleServices extends Services {
    constructor() {
        super('Person')
        this.registrations = new Services('Registration')
    }

    async getAllActivePeople(where = {}) {
        return database[this.modelName].findAll({ where: {...where}});
    }
    
    async getAll(where = {}) {
        return database[this.modelName].scope('all').findAll({ where: {...where}})
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