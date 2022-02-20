const { Router } = require('express');
const PersonController = require('../controllers/PersonController');
const RegistrationController = require('../controllers/RegistrationController');

const router = Router()

router
    .get('/pessoas', PersonController.getAllPeople)
    .get('/pessoas/ativas', PersonController.getAllActivePeople)
    .get('/pessoas/:id', PersonController.getOnePerson)
    .get('/pessoas/:studentId/matriculas', PersonController.getStudentRegistrations)
    .get('/pessoas/:studentId/matriculas/:registrationId', RegistrationController.getOneRegistration)
    .get('/pessoas/matriculas/:classId/confirmadas', RegistrationController.getRegistrationsByClass)
    .post('/pessoas', PersonController.createPerson)
    .post('/pessoas/:studentId/matriculas/', RegistrationController.createRegistration)
    .post('/pessoas/:id/restaura', PersonController.restorePerson)
    .post('/pessoas/:studentId/cancela', PersonController.cancelDeactivatedStudentRegistrations)
    .post('/pessoas/:studentId/matriculas/:registrationId/restaura', RegistrationController.restoreRegistration)
    .put('/pessoas/:studentId/matriculas/:registrationId', RegistrationController.updateRegistration)
    .put('/pessoas/:id', PersonController.updatePerson)
    .delete('/pessoas/:studentId/matriculas/:registrationId', RegistrationController.deleteRegistration)
    .delete('/pessoas/:id', PersonController.deletePerson)



module.exports = router;