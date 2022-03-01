const Services = require('../services/Services');
const levelsServices = new Services('Level');
const paginationValidator = require('./validation/paginationValidator');
const WrongFormatException = require('./exceptions/WrongFormatException');

class LevelController {
    static async getAllLevels(req, res) {
        try {
            const pageAsNumber = Number.parseInt(req.query.page);
            const sizeAsNumber = Number.parseInt(req.query.size);
            const pagination = paginationValidator.paginationValidatorBuilder(pageAsNumber, sizeAsNumber, req.query.order);

            const allLevels = await levelsServices.getAllData({}, [['id', pagination.order]], pagination.page, pagination.size);
            
            return res.status(200).json({
                content: allLevels.rows,
                totalPages: Math.ceil(allLevels.count / pagination.size)
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneLevel(req, res, next) {
        try {
            const { id } = req.params;
            if (Number.isNaN(id)) {
                next(new WrongFormatException('id'));
            }
            const level = await levelsServices.getData({ id });
            return res.status(200).json(level);
        } catch (error) {
            next (error);
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
            return res.status(200).json( { message: `${id} deleted.`} );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreLevel(req, res) {
        const { id } = req.params;
        try {
            await levelsServices.restoreData(id);
            return res.status(200).json( { message: `${id} restored` } )
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

}

module.exports = LevelController;