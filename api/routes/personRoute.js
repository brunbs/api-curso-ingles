const { Router } = require('express');
const { route } = require('express/lib/application');
const PersonController = require('../controllers/PersonController');

const router = Router()

router.get('/pessoas', PersonController.getAllPeople);

router.get('/pessoas/:id', PersonController.getOnePerson);

router.post('/pessoas', PersonController.createPerson);

module.exports = router;