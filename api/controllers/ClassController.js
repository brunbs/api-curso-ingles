const { ClassesServices } = require('../services');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const paginationValidator = require('./validation/paginationValidator');

const classesServices = new ClassesServices();

class ClassController {
    static async getAllClasses(req, res) {
        const { date_beginning, date_end } = req.query;
        const where = {};
        date_beginning || date_end ? where.starting_date = {} : null
        date_beginning ? where.starting_date[Op.gte] = date_beginning : null
        date_end ? where.starting_date[Op.lte] = date_end : null

        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        const pagination = paginationValidator.paginationValidatorBuilder(pageAsNumber, sizeAsNumber, req.query.order);

        try {
            const allClasses = await classesServices.getAllData(where, [['id', pagination.order]], pagination.page, pagination.size);
            return res.status(200).json({
                content: allClasses.rows,
                totalPages: Math.ceil(allClasses.count / pagination.size)
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneClass(req, res, next) {
        const { id } = req.params;
        try {
            const foundClass = await classesServices.getData({ id });
            return res.status(200).json(foundClass);
        } catch (error) {
            next (error);
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
            return res.status(200).json( { message: `${id} deleted.`} );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreClass(req, res) {
        const { id } = req.params;
        try {
            await classesServices.restoreData(id);
            return res.status(200).json( { message: `${id} restored` } )
        } catch(error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = ClassController;