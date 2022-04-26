var express = require('express');
var router = express.Router();
const newsControllers = require('../controllers/news');
const jwtAuth = require('../middleware/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//endpoint to create news
router.post('/create', newsControllers.newsControllers.createNews);

//endpoint to fetch all news new - to - old
router.get('/all', newsControllers.newsControllers.getAllNews);

//endpoint to fetch news by category 10 at a time
router.get('/:categoryName/:id', newsControllers.newsControllers.getByCategory);

//endpoint to fetch a single news with its id
router.get('/:id', newsControllers.newsControllers.getOne);

//endpoint to delete a single news with its id
router.delete('/delete/:id', newsControllers.newsControllers.deleteNews);

//endpoint to update a single news with its id
router.put('/update/:id', newsControllers.newsControllers.updateNews);

module.exports = router;