const Router = require('express');
const router = new Router();
const CityController = require('../controllers/cityController');

router.post('/addCity', CityController.addCity);
router.get('/getAllCity', CityController.getAllCity);
router.get('/getAllCityByContry/:countryId', CityController.getAllCityByCountryId);
router.get('/:id', CityController.getCityById);
router.delete('/delete/:id', CityController.deleteCityById);
router.put('/update/:id', CityController.updateCityById);
module.exports = router;