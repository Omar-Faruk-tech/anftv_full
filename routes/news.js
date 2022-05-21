var express = require('express');
var router = express.Router();
const newsControllers = require('../controllers/news');
const { jwtAuth } = require('../middleware/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//endpoint to create news
router.post('/create', jwtAuth.verifyAdmin, newsControllers.newsControllers.createNews);

//endpoint to fetch all news new - to - old
router.get('/all', newsControllers.newsControllers.getAllNews);

//endpoint to fetch news by category 10 at a time
router.get('/:categoryName/:id', newsControllers.newsControllers.getByCategory);

//endpoint to fetch news by category 10 at a time
router.get('/top-stories', newsControllers.newsControllers.getTopStories);

//endpoint to fetch news by category 10 at a time
router.get('/editors-pick', newsControllers.newsControllers.getEditorsPick);

//endpoint to fetch news by category 10 at a time
router.get('/featured', newsControllers.newsControllers.getFeatured);

//endpoint to fetch a single news with its id
router.get('/:id', newsControllers.newsControllers.getOne);

//endpoint to delete a single news with its id
router.delete('/delete/:id', jwtAuth.verifyAdmin, newsControllers.newsControllers.deleteNews);

//endpoint to update a single news with its id
router.put('/update/:id', jwtAuth.verifyAdmin, newsControllers.newsControllers.updateNews);

module.exports = router;