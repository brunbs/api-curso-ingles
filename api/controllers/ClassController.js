const database = require('../models');

class ClassController {
    static async getAllClasses(req, res) {
        try {
            const allClasses = await database.Class.findAll();
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
}

module.exports = ClassController;