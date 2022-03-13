const router = require('express').Router();
const api = require('./api');


router.get('/api', api);


module.exports = router;