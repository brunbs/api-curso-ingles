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
        const { id } = req.params;
        try {
            const person = await peopleServices.getData({id});
            return res.status(200).json(person);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async createPerson(req, res) {
        const newPerson = req.body;
        try {
            const createdPerson = await peopleServices.createData(newPerson);
            return res.status(201).json(createdPerson);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updatePerson(req, res) {
        const { id } = req.params;
        const receivedDataToUpdate = req.body;
        try {
            await peopleServices.updateData(receivedDataToUpdate, Number(id));
            const updatedPerson = await peopleServices.getData({id});
            return res.status(200).json(updatedPerson);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletePerson(req, res) {
        const { id } = req.params;
        try {
            await peopleServices.deleteData(Number(id));
            return res.status(200).json({ mensagem: `id ${id} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restorePerson(req, res) {
        const { id } = req.params;
        try {
            const restoredPerson = await peopleServices.restoreData(Number(id));
            return res.status(200).json(restoredPerson);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    static async getStudentRegistrations(req, res) {
        const { studentId } = req.params;
        try {
            const registrations = await peopleServices.getStudentRegistrations({ id: Number(studentId) });
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