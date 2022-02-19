const database = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ClassController {
    static async getAllClasses(req, res) {
        const { data_inicial, data_final } = req.query;
        const where = {};
        data_inicial || data_final ? where.starting_date = {} : null
        data_inicial ? where.starting_date[Op.gte] = data_inicial : null
        data_final ? where.starting_date[Op.lte] = data_final : null
        try {
            const allClasses = await database.Class.getAllData(where);
            return res.status(200).json(allClasses);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneClass(req, res) {
        try {
            const { id } = req.params;
            const foundClass = await database.Class.findOne({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json(foundClass);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async createClass(req, res) {
        const receivedClass = req.body;
        try {
            const createdClass = await database.Class.create(receivedClass);
            return res.status(201).json(createdClass);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateClass(req, res) {
        const { id } = req.params;
        const receivedDataToUpdate = req.body;
        try {
            await database.Class.update(receivedDataToUpdate, {
                where: {
                    id: Number(id)
                }
            });
            const updatedClass = await database.Level.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(updatedClass);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteClass(req, res) {
        const { id } = req.params;
        try {
            await database.Class.destroy({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json( { menssagem: `${id} deletado.`} );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreClass(req, res) {
        const { id } = req.params;
        try {
            await database.Class.restore({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json({menssagem: `${id} restaurado`})
        } catch(error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = ClassController;