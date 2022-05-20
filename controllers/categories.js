const categories = require('../models/categories');

exports.categoriesControllers = {
    createCategory: (req, res) => {
        const newCategory = new categories(req.body);
        let categoryName = newCategory.name;
        category = categoryName.toLowerCase();
        if (category === 'politics' || category === 'sports' || category === 'technology' || category === 'business' || category === 'culture' || category === 'entertainment') {
        newCategory.name = newCategory.name.charAt(0).toUpperCase() + newCategory.name.slice(1);
        console.log(newCategory.name);
        categories
        .create(newCategory)
            .then((data) => {
            res
                .status(200)
                .send({
                message: "News added successfully",
                status: "Success",
                data: data
                })
            })
            .catch((err) => {
            res
                .status(400)
                .send(err)
            })
        } else {
        res.status(400)
            .send({
            message: "invalid category"
            })
        }
        },
    updateCategory: (req, res) => {
        const newCategory = req.body;
        const { categoryId } = req.query;
        const filter = {
            _id: categoryId
          };
          let categoryName = newCategory.name;
          const category = categoryName.toLowerCase();
          if (category === 'politics' || category === 'sports' || category === 'technology' || category === 'business' || category === 'culture' || category === 'entertainment') {
          newCategory.name = newCategory.name.charAt(0).toUpperCase() + newCategory.name.slice(1);
        categories
          .findByIdAndUpdate(filter, newCategory, {new: true}, (err, data) => {
            if(!data) {
              res.status(400)
                 .send({
                   status: "failed", 
                   message: "Category not found"
                 })
            } else {
            res.status(200)
               .send({
                 status: "success",
                 message: "Category updated successfully",
                 data: data
               });
              }
          });
        } else {
          res.status(400)
             .send({
                status: "failed",
                massage: "invalid category"
             })
        }
    },
    getAllCategories: (req, res) => {
        categories
            .find()
            .then((data) => {
                res
                .status(200)
                .send({
                    success: true,
                    data
                });
            })
            .catch((err) => {
                res
                .status(400)
                .send({
                    success: false,
                    message: err.message || "could not fetch record"
                });
            })
    }
}