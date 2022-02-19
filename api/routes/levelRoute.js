const { Router } = require('express');
const LevelController = require('../controllers/LevelController');

const router = Router()

router
    .get('/niveis', LevelController.getAllLevels)
    .get('/niveis/:id', LevelController.getOneLevel)
    .post('/niveis', LevelController.createLevel)
    .post('/niveis/:id/restaura', LevelController.restoreLevel)
    .put('/niveis/:id', LevelController.updateLevel)
    .delete('/niveis/:id', LevelController.deleteLevel)
module.exports = router;