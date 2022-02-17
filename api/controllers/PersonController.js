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

    static async getOnePerson(req, res) {
        try {
            const { id } = req.params;
            const person = await database.Person.findOne({ 
                where: { 
                    id: Number(id) 
                }
            });
            return res.status(200).json(person);
        } catch (error)  {
            return res.status(500).json(error.message);
        }
    }

    static async createPerson(req, res) {
        const receivedPerson = req.body;
        try {
            const createdPerson = await database.Person.create(receivedPerson);
            return res.status(201).json(createdPerson);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PersonController;