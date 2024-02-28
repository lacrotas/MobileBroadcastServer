const Router = require('express');
const router = new Router();
const CreatorController = require('../controllers/creatorController');

router.post('/addCreator', CreatorController.addCreator);
router.get('/getAllCreator', CreatorController.getAllCreator);
router.get('/:id', CreatorController.deleteCreatorById);

module.exports = router;