const { Router } = require('express');
const { route } = require('express/lib/application');
const LevelController = require('../controllers/LevelController');

const router = Router()

router.get('/niveis', LevelController.getAllLevels);

router.get('/niveis/:id', LevelController.getOneLevel);

router.post('/niveis', LevelController.createLevel);

router.put('/niveis/:id', LevelController.updateLevel);

router.delete('/niveis/:id', LevelController.deleteLevel);

module.exports = router;