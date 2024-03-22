const Router = require('express');
const router = new Router();
const SponsorPanelController = require('../controllers/sponsorPanelController');

router.post('/addSponsor', SponsorPanelController.addSponsorStatement);
router.get('/getAllSponsprs', SponsorPanelController.getAllSponsorStatement);
router.get('/sponsor/:id', SponsorPanelController.getSponsorsStatementById);
router.delete('/sponsorDelete/:id', SponsorPanelController.deleteSponsorStatementById);


module.exports = router;