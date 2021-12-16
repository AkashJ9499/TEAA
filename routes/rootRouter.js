var router = require('express').Router();
var rootCont = require('../controllers/rootController');

router
.get('/',rootCont.homePage)

.get('/success', rootCont.successPage)

.get('/error', rootCont.errorPage);

module.exports = router;