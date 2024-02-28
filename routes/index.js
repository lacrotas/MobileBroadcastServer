const Router = require('express');
const router = new Router();
const cityRouter = require('./cityRouter');
const expertRouter = require('./expertRouter');
const userRouter = require('./userRouter');
const creatorRouter = require('./creatorRouter');
const meatingRouter = require('./meatingRouter');
const expertStatementRouter = require('./expertStatementRouter');

router.use('/city', cityRouter)
router.use('/expert', expertRouter)
router.use('/user', userRouter)
router.use('/creator', creatorRouter)
router.use('/meating', meatingRouter)
router.use('/expertStatement', expertStatementRouter)

module.exports = router;