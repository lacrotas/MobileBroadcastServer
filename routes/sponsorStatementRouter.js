const Router = require('express');
const router = new Router();
const SponsorStatementController = require('../controllers/sponsorStatementController');

router.post('/addStatement', SponsorStatementController.addSponsorStatement);
router.get('/getAllStatement', SponsorStatementController.getAllSponsorStatement);
router.get('/statement/:id', SponsorStatementController.getSponsorsStatementById);
router.delete('/statementDelete/:id', SponsorStatementController.deleteSponsorStatementById);


module.exports = router;