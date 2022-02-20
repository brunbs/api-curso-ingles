const { RegistrationsServices } = require('../services');
const registrationsServices = new RegistrationsServices();

class RegistrationController {

    static async getOneRegistration(req, res) {
        const { studentId, registrationId } = req.params;
        try {
            const registration = await registrationsServices.getData({id: registrationId, student_id: studentId});
            return res.status(200).json(registration);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    
    static async createRegistration(req, res) {
        const { studentId } = req.params;
        const newRegistration = {...req.body, student_id: Number(studentId) };
        try {
            const createdRegistration = await registrationsServices.createData(newRegistration);
            return res.status(201).json(createdRegistration);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateRegistration(req, res) {
        const { studentId, registrationId } = req.params;
        const receivedDataToUpdate = req.body;
        try {
            await registrationsServices.updateSomeData(receivedDataToUpdate, { id: Number(registrationId), student_id: Number(studentId)});
            const updatedRegistration = await registrationsServices.getData({id: registrationId, student_id: studentId});
            return res.status(200).json(updatedRegistration);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteRegistration(req, res) {
        const { registrationId } = req.params;
        try {
            await registrationsServices.deleteData(Number(registrationId));
            return res.status(200).json({ mensagem: `id ${registrationId} deletado.`})
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreRegistration(req, res) {
        const { registrationId } = req.params;
        try {
            await registrationsServices.restoreData(Number(registrationId));
            return res.status(200).json({menssagem: `${registrationId} restaurado`})
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    static async getRegistrationsByClass(req, res) {
        const { classId } = req.params;
        try {
            const classRegistrations = await registrationsServices.findAndCount(
                { class_id: Number(classId), status: 'confirmado'},
                { limit: 20, order: [['student_id', 'ASC']]}
            );
            return res.status(200).json(classRegistrations);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = RegistrationController