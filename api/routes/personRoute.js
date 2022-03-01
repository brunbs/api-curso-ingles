const { Router } = require('express');
const PersonController = require('../controllers/PersonController');
const RegistrationController = require('../controllers/RegistrationController');
const ErrorHandler = require('../error/ErrorHandler');

const router = Router()

router
    .get('/people', PersonController.getAllPeople)
    .get('/people/active', PersonController.getAllActivePeople)
    .get('/people/:id', PersonController.getOnePerson)
    .get('/people/:studentId/registrations', PersonController.getStudentRegistrations)
    .get('/people/:studentId/registrations/:registrationId', RegistrationController.getOneRegistration)
    .get('/people/registrations/:classId/confirmed', RegistrationController.getRegistrationsByClass)
    .post('/people', PersonController.createPerson)
    .post('/people/:studentId/registrations/', RegistrationController.createRegistration)
    .post('/people/:id/restore', PersonController.restorePerson)
    .post('/people/:studentId/cancel', PersonController.cancelDeactivatedStudentRegistrations)
    .post('/people/:studentId/registrations/:registrationId/restore', RegistrationController.restoreRegistration)
    .put('/people/:studentId/registrations/:registrationId', RegistrationController.updateRegistration)
    .put('/people/:id', PersonController.updatePerson)
    .delete('/people/:studentId/registrations/:registrationId', RegistrationController.deleteRegistration)
    .delete('/people/:id', PersonController.deletePerson)
    
module.exports = router;