const Router = require('express');
const router = new Router();
const CreatorController = require('../controllers/creatorController');

router.post('/addCreator', CreatorController.addCreator);
router.delete('/delete/:id', CreatorController.deleteCreatorById);
router.delete('/deleteByCityId/:cityId', CreatorController.deleteAllCreatorByCityId);
router.get('/getAllByCityId/:cityId', CreatorController.getAllCreatorByCityId);
router.get('/get/:id', CreatorController.getCreatorById);
router.put('/update/:id', CreatorController.updateCreatorById);


module.exports = router;