const Router = require('express');
const router = new Router();
const GallaryImageController = require('../controllers/gallaryImageController');

router.post('/addImage', GallaryImageController.addGallaryImage);
router.get('/getAllImage/:cityId', GallaryImageController.getAllGallaryImageByCityId);
router.delete('/deleteImage/:id', GallaryImageController.deleteGallaryImageById);
router.delete('/deleteAllImage/:cityId', GallaryImageController.deleteAllGallaryImageByCityId);

module.exports = router;