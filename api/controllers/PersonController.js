//const database = require('../models');
const { PeopleServices } = require('../services');
const peopleServices = new PeopleServices();

class PersonController {
    static async getAllActivePeople(req, res) {
        try {
            const allActivePeople = await peopleServices.getAllActivePeople();
            return res.status(200).json(allActivePeople);
        } catch (error) {
            return res.status(500).json(error.message);
        }
        
    }

    static async getAllPeople(req, res) {
        try {
            const allPeople = await peopleServices.getAll();
            return res.status(200).json(allPeople);
        } catch (error) {
            return res.status(500).json(error.message);
        }
        
    }

    static async getOnePerson(req, res) {
        try {
            const { id } = req.params;
            const person = await peopleServices.getData(Number(id));
            return res.status(200).json(person);
        } catch (error) {
            return res.status(500).send(error.message);
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

    static async updatePerson(req, res) {
        const { id } = req.params;
        const receivedDataToUpdate = req.body;
        try {
            await database.Person.update(receivedDataToUpdate, {
                where: {
                    id: Number(id)
                }
            });
            const updatedPerson = await database.Person.findOne({ 
                where: { 
                    id: Number(id) 
                }
            });
            return res.status(200).json(updatedPerson);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletePerson(req, res) {
        const { id } = req.params;
        try {
            await database.Person.destroy({
                where: {
                    id: Number(id)
                }
            }); 
            return res.status(200).json({ mensagem: `id ${id} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restorePerson(req, res) {
        const { id } = req.params;
        try {
            await database.Person.restore({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json({menssagem: `${id} restaurado`})
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    static async getStudentRegistrations(req, res) {
        const { studentId } = req.params;
        try {
            const student = await database.Person.findOne({ where: {id: Number(studentId)}});
            const registrations = await student.getConfirmedRegistrations();
            return res.status(200).json(registrations);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelDeactivatedStudentRegistrations(req, res) {
        const { studentId } = req.params;
        try {
            await peopleServices.cancelPersonAndRegistrations(Number(studentId));
            return res.status(200).json({ message: `Matrículas ref. estudante ${studentId} canceladas` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PersonController;