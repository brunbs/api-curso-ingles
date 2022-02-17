const database = require('../models');

class LevelController {
    static async getAllLevels(req, res) {
        try {
            const allLevels = await database.Level.findAll();
            return res.status(200).json(allLevels);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneLevel(req, res) {
        try {
            const { id } = req.params;
            const level = await database.Level.findOne({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json(level);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async createLevel(req, res) {
        const receivedLevel = req.body;
        try {
            const createdLevel = await database.Level.create(receivedLevel);
            return res.status(201).json(createdLevel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateLevel(req, res) {
        const { id } = req.params;
        const receivedDataToUpdate = req.body;
        try {
            await database.Level.update(receivedDataToUpdate, {
                where: {
                    id: Number(id)
                }
            });
            const updatedLevel = await database.Level.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(updatedLevel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteLevel(req, res) {
        const { id } = req.params;
        try {
            await database.Level.destroy({
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

module.exports = LevelController;