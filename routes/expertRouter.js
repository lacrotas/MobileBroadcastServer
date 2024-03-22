const Router = require('express');
const router = new Router();
const ExpertController = require('../controllers/expertController');

router.post('/addExpert', ExpertController.addExpert);
router.get('/getAll', ExpertController.getAllExpert);
router.get('/:id', ExpertController.getExpertById);
router.put('/update/:id', ExpertController.updateExpert);
router.delete('/delete/:id', ExpertController.deleteExpertById);
router.delete('/deleteByCityId/:cityId', ExpertController.deleteExpertByCityId);
router.get('/getAllExpertMeating/:meatingId', ExpertController.getExpertsForMeeting);

module.exports = router;