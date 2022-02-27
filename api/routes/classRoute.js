const { Router } = require('express');
const ClassController = require('../controllers/ClassController');

const router = Router()

router
    .get('/classes', ClassController.getAllClasses)
    .get('/classes/:id', ClassController.getOneClass)
    .post('/classes', ClassController.createClass)
    .post('/classes/:id/restaura', ClassController.restoreClass)
    .put('/classes/:id', ClassController.updateClass)
    .delete('/classes/:id', ClassController.deleteClass)
    
module.exports = router;