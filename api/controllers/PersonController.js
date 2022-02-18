const database = require('../models');

class PersonController {
    static async getAllActivePeople(req, res) {
        try {
            const allActivePeople = await database.Person.findAll();
            return res.status(200).json(allActivePeople);
        } catch (error) {
            return res.status(500).json(error.message);
        }
        
    }

    static async getAllPeople(req, res) {
        try {
            const allPeople = await database.Person.scope('all').findAll();
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

    static async getOneRegistration(req, res) {
        try {
            const { studentId, registrationId } = req.params;
            const registration = await database.Registration.findOne({ 
                where: { 
                    id: registrationId,
                    student_id: Number(studentId)
                }
            });
            return res.status(200).json(registration);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    
    static async createRegistration(req, res) {
        const { studentId } = req.params;
        const receivedRegistration = {...req.body, student_id: Number(studentId) };
        try {
            const createdRegistration = await database.Registration.create(receivedRegistration);
            return res.status(201).json(createdRegistration);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateRegistration(req, res) {
        const { studentId, registrationId } = req.params;
        const receivedDataToUpdate = req.body;
        try {
            await database.Registration.update(receivedDataToUpdate, {
                where: {
                    id: Number(registrationId),
                    student_id: Number(studentId)
                }
            });
            const updatedRegistration = await database.Registration.findOne({ 
                where: { 
                    id: Number(registrationId)
                }
            });
            return res.status(200).json(updatedRegistration);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteRegistration(req, res) {
        const { studentId, registrationId } = req.params;
        try {
            await database.Registration.destroy({
                where: {
                    id: Number(registrationId),
                    student_id: Number(studentId)
                }
            }); 
            return res.status(200).json({ mensagem: `id ${registrationId} deletado.`})
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

    static async restoreRegistration(req, res) {
        const { studentId, registrationId } = req.params;
        try {
            await database.Registration.restore({
                where: {
                    id: Number(registrationId),
                    student_id: Number(studentId)
                }
            });
            return res.status(200).json({menssagem: `${registrationId} restaurado`})
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

    static async getRegistrationsByClass(req, res) {
        const { classId } = req.params;
        try {
            const classRegistrations = await database.Registration.findAndCountAll({
                where: {
                    class_id: Number(classId),
                    status: 'confirmado'
                },
                order:[['student_id', 'ASC']]
            });
            return res.status(200).json(classRegistrations);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelDeactivatedStudentRegistrations(req, res) {
        const { studentId } = req.params;
        try {
            database.sequelize.transaction(async dbTransaction => {
                await database.Person.update({ active: false }, { 
                    where: 
                        { id: Number(studentId) } 
                }, { transaction: dbTransaction});
                await database.Registration.update({ status: 'cancelado' }, { 
                    where: { student_id: Number(studentId) 
                }});
                return res.status(200).json({ message: `Matrículas ref. estudante ${studentId} canceladas` });    
            })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PersonController;