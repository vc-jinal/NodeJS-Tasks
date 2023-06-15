const express = require('express');
const router = express.Router();
const authenticationRouter = require('./authentication.route');
const placeRouter = require('./place.route');
const userRouter = require('./user.route');

router.use('/auth', authenticationRouter);
router.use('/place', placeRouter);
router.use('/user', userRouter);

module.exports = router;