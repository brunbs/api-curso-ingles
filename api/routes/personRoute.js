const { Router } = require('express');
const { route } = require('express/lib/application');
const PersonController = require('../controllers/PersonController');

const router = Router()

router.get('/pessoas', PersonController.getAllPeople);

router.get('/pessoas/:id', PersonController.getOnePerson);

router.post('/pessoas', PersonController.createPerson);

router.put('/pessoas/:id', PersonController.updatePerson);

router.delete('/pessoas/:id', PersonController.deletePerson);

module.exports = router;