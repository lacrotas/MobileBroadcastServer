const Router = require('express');
const router = new Router();
const MeatingsController = require('../controllers/meatingController');

router.post('/addMeating', MeatingsController.addMeating);
router.get('/getAllMeating', MeatingsController.getAllMeating);
router.get('/:expertsId', MeatingsController.getMeatingByExpert);


module.exports = router;