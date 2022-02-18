const { Router } = require('express');
const { route } = require('express/lib/application');
const { getOneRegistration } = require('../controllers/PersonController');
const PersonController = require('../controllers/PersonController');

const router = Router()

router.get('/pessoas', PersonController.getAllActivePeople);

router.get('/pessoas/todos', PersonController.getAllPeople);

router.get('/pessoas/:id', PersonController.getOnePerson);

router.get('/pessoas/:studentId/matriculas', PersonController.getStudentRegistrations);

router.get('/pessoas/:studentId/matriculas/:registrationId', PersonController.getOneRegistration);

router.get('/pessoas/matriculas/:classId/confirmadas', PersonController.getRegistrationsByClass);

router.post('/pessoas', PersonController.createPerson);

router.post('/pessoas/:studentId/matriculas/', PersonController.createRegistration);

router.post('/pessoas/:id/restaura', PersonController.restorePerson);

router.post('/pessoas/:studentId/matriculas/:registrationId/restaura', PersonController.restoreRegistration);

router.put('/pessoas/:studentId/matriculas/:registrationId', PersonController.updateRegistration);

router.put('/pessoas/:id', PersonController.updatePerson);

router.delete('/pessoas/:studentId/matriculas/:registrationId', PersonController.deleteRegistration);

router.delete('/pessoas/:id', PersonController.deletePerson);



module.exports = router;