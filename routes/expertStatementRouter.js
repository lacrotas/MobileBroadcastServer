const Router = require('express');
const router = new Router();
const ExpertStatementController = require('../controllers/expertStatementController');

router.post('/addStatement', ExpertStatementController.addExpertStatement);
router.get('/getAllStatement', ExpertStatementController.getAllExpertStatement);
router.get('/statement/:id', ExpertStatementController.getExpertStatementById);

module.exports = router;