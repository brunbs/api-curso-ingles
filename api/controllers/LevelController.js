const Services = require('../services/Services');
const levelsServices = new Services('Level');

class LevelController {
    static async getAllLevels(req, res) {
        try {
            const pageAsNumber = Number.parseInt(req.query.page);
            const sizeAsNumber = Number.parseInt(req.query.size);

            let page = 0;
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                page = pageAsNumber;
            }

            let size = 10;
            if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                size = sizeAsNumber;
            }

            const orderParam = req.query.order;
            let order = 'ASC';
            if(orderParam === 'DESC') {
                order = orderParam;
            }

            const allLevels = await levelsServices.getAllData({}, [['id', order]], page, size);
            
            return res.status(200).json({
                content: allLevels.rows,
                totalPages: Math.ceil(allLevels.count / size)
            });
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