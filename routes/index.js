var express = require('express');
var router = express.Router();
import {signup} from '../controllers/userController'
/* GET home page. */
router.post('/signup', signup);

module.exports = router;
