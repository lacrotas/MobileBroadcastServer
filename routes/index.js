const Router = require('express');
const router = new Router();
const cityRouter = require('./cityRouter');
const expertRouter = require('./expertRouter');
const userRouter = require('./userRouter');
const creatorRouter = require('./creatorRouter');
const meatingRouter = require('./meatingRouter');
const expertStatementRouter = require('./expertStatementRouter');
const countryRouter = require('./countryRouter');

router.use('/city', cityRouter)
router.use('/expert', expertRouter)
router.use('/user', userRouter)
router.use('/creator', creatorRouter)
router.use('/meating', meatingRouter)
router.use('/expertStatement', expertStatementRouter)
router.use('/country', countryRouter)

module.exports = router;