var express = require('express');
const { categoriesControllers } = require('../controllers/categories');
var router = express.Router();


//create category
// router.post('/create', categoriesControllers.createCategory);

//endpoint to create news
router.patch('/update', categoriesControllers.updateCategory);

//endpoint to fetch all news new - to - old
router.get('/all', categoriesControllers.getAllCategories);

module.exports = router;