const { Router } = require('express');
const PersonController = require('../controllers/PersonController');

const router = Router()

router.get('/pessoas', PersonController.getAllPeople);

router.get('/pessoas/:id', PersonController.getOnePerson);

module.exports = router;