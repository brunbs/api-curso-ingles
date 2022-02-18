const { Router } = require('express');
const { route } = require('express/lib/application');
const ClassController = require('../controllers/ClassController');

const router = Router()

router.get('/turmas', ClassController.getAllClasses);

router.get('/turmas/:id', ClassController.getOneClass);

router.post('/turmas', ClassController.createClass);

router.put('/turmas/:id', ClassController.updateClass);

router.delete('/turmas/:id', ClassController.deleteClass);

router.post('/turmas/:id/restaura', ClassController.restoreClass);

module.exports = router;