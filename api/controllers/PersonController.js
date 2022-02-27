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

            const allPeople = await peopleServices.getAll({}, page, size);
            return res.status(200).json({
                content: allPeople.rows,
                totalPages: Math.ceil(allPeople.count / size)
            })
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
            return res.status(200).json({ message: `id ${id} deleted.`})
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
            return res.status(200).json({ message: `Student's ${studentId} registrations canceled` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PersonController;