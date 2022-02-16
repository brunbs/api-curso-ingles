const database = require('../models');

class PersonController {
    static async getAllPeople(req, res) {
        try {
            const allPeople = await database.Person.findAll();
            return res.status(200).json(allPeople);
        } catch (error) {
            return res.status(500).json(error.message);
        }
        
    }
}

module.exports = PersonController;