const Router = require('express');
const router = new Router();
const CityController = require('../controllers/cityController');

router.post('/addCity', CityController.addCity);
router.get('/getAllCity', CityController.getAllCity);
router.get('/:id', CityController.getCityById);

module.exports = router;