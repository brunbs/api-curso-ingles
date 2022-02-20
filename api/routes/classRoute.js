const { Router } = require('express');
const ClassController = require('../controllers/ClassController');

const router = Router()

router
    .get('/turmas', ClassController.getAllClasses)
    .get('/turmas/:id', ClassController.getOneClass)
    .post('/turmas', ClassController.createClass)
    .post('/turmas/:id/restaura', ClassController.restoreClass)
    .put('/turmas/:id', ClassController.updateClass)
    .delete('/turmas/:id', ClassController.deleteClass)
    
module.exports = router;