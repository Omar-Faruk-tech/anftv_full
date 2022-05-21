var express = require('express');
var router = express.Router();
const newsControllers = require('../controllers/news');
const { jwtAuth } = require('../middleware/auth');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'ANF TV' });
// });

// get landing page data
router.get('/landing', newsControllers.newsControllers.getLanding);

// verify users
router.get('/verify', jwtAuth.verifyLogger, function(req, res) {
    return {
        success: true, 
        message: "verification success"
    }
});


module.exports = router;
