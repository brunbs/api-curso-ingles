const Services = require('../services/Services');
const levelsServices = new Services('Level');

class LevelController {
    static async getAllLevels(req, res) {
        try {
            const allLevels = await levelsServices.getAllData();
            return res.status(200).json(allLevels);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneLevel(req, res) {
        try {
            const { id } = req.params;
            const level = await levelsServices.getData({ id });
            return res.status(200).json(level);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async createLevel(req, res) {
        const newLevel = req.body;
        try {
            const createdLevel = await levelsServices.createData(newLevel);
            return res.status(201).json(createdLevel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateLevel(req, res) {
        const { id } = req.params;
        const receivedDataToUpdate = req.body;
        try {
            await levelsServices.updateData(receivedDataToUpdate, id);
            const updatedLevel = await levelsServices.getData({id});
            return res.status(200).json(updatedLevel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteLevel(req, res) {
        const { id } = req.params;
        try {
            await levelsServices.deleteData(id);
            return res.status(200).json( { mensagem: `${id} deletado.`} );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreLevel(req, res) {
        const { id } = req.params;
        try {
            await levelsServices.restoreData(id);
            return res.status(200).json({mensagem: `${id} restaurado`})
        } catch(error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = LevelController;