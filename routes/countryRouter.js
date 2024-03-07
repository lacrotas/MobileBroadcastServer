const Router = require('express');
const router = new Router();
const CountryController = require('../controllers/countryController');

router.post('/addCountry', CountryController.addCountry);
router.get('/getAllCountry', CountryController.getAllCountry);
router.delete('/deleteCountry/:id', CountryController.deleteCountryById);
router.put('/updateCountry/:id', CountryController.updateCountryById);

module.exports = router;