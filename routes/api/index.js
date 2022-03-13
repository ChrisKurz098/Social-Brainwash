const router = require('express').Router();
const user = require('./user');
const thought = require('./thought');

router.get('/users', user);
router.get('/thoughts', thought);

module.exports = router;