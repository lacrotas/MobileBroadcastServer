const Router = require('express');
const router = new Router();
const ExpertController = require('../controllers/expertController');

router.post('/addExpert', ExpertController.addExpert);
router.get('/getAll', ExpertController.getAllExpert);
router.get('/:id', ExpertController.getExpertById);

module.exports = router;