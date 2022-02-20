const { ClassesServices } = require('../services');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const classesServices = new ClassesServices();

class ClassController {
    static async getAllClasses(req, res) {
        const { data_inicial, data_final } = req.query;
        const where = {};
        data_inicial || data_final ? where.starting_date = {} : null
        data_inicial ? where.starting_date[Op.gte] = data_inicial : null
        data_final ? where.starting_date[Op.lte] = data_final : null
        try {
            const allClasses = await classesServices.getAllData(where);
            return res.status(200).json(allClasses);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneClass(req, res) {
        const { id } = req.params;
        try {
            const foundClass = await classesServices.getData({ id });
            return res.status(200).json(foundClass);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async createClass(req, res) {
        const newClass = req.body;
        try {
            const createdClass = await classesServices.createData(newClass);
            return res.status(201).json(createdClass);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateClass(req, res) {
        const { id } = req.params;
        const receivedDataToUpdate = req.body;
        try {
            await classesServices.updateData(receivedDataToUpdate, id);
            const updatedClass = await classesServices.getData({ id });
            return res.status(200).json(updatedClass);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteClass(req, res) {
        const { id } = req.params;
        try {
            await classesServices.deleteData(id);
            return res.status(200).json( { mensagem: `${id} deletado.`} );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreClass(req, res) {
        const { id } = req.params;
        try {
            await classesServices.restoreData(id);
            return res.status(200).json({menssagem: `${id} restaurado`})
        } catch(error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = ClassController;