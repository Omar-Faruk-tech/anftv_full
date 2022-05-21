const news = require('../models/news');

exports.newsControllers = {
createNews: (req, res) => {
    const newsObj = new news(req.body);
    let category = newsObj.category;
    category = category.toLowerCase();
    if (category === 'politics' || category === 'sports' || category === 'technology' || category === 'business' || category === 'culture' || category === 'entertainment') {
    newsObj.category = newsObj.category.charAt(0).toUpperCase() + newsObj.category.slice(1);
    console.log(newsObj.category);
      news
      .create(newsObj)
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
getLanding: (req, res) => {
  //Res array that will contain all needed data
  const resArr = [];
  news.find()
      .then((data) => {

        const topStories = [];
        const editorsPick = [];
        const featured = [];
        const topInCat = [];
        const pickedCat = [];

        //sort from new to old
        const newData = data.reverse();
        newData.forEach(element => {
          let tops = element.topStory;
          // console.log(tops);
          let edits = element.editorsPick;
          // console.log(edits);
          let cat = element.category;
          // console.log(cat);
          if (tops) {
            if (pickedCat.indexOf(cat) < 0) {
              topInCat.push(element);
              pickedCat.push(cat);
            }
            topStories.push(element);
          } else if (edits) {
            editorsPick.push(element);
          }; 
          if (featured.length < 30) {
            featured.push(element);
          }
        });
        resArr.push(topStories);
        resArr.push(editorsPick);
        resArr.push(featured);
        resArr.push(topInCat);

        // console.log(resArr.length);
        res.status(200)
           .send(resArr);
      })
      .catch((err) => {
        res.status(400)
           .send(err.message);
      })
},
getByCategory: (req, res) => {
  news
    .find()
      .then((data) => {
        let catArr = [];
        let newsArr = [];
        let categoryName = req.params.categoryName;
        categoryName = categoryName.toLowerCase();
        if (categoryName === "news") {
          let newData = data.reverse();
          res.status(200)
             .send(newData);
        } else {
        // console.log(categoryName);
        // res.send(categoryName);
        let num = req.params.id;
        num = (Number(num)) * 10;
        // console.log(num);
        // console.log(typeof(num) === Number);
        let idChecker = [-10];
        // console.log(data);
        data.forEach(element => {
          let currentCatName = element.category;
          currentCatName = currentCatName.toLowerCase();
          // console.log(currentCatName);
          if(categoryName == currentCatName){
            catArr.push(element);
          };
        });
        
        // console.log(catArr);
        // res.send(catArr);
        
        // console.log(num -10);
        for (let i = num; i > (num - 10); i--) {
          if (catArr[i]) {
            let currentId = catArr[i].id;
            if (idChecker.indexOf(currentId) < 0) {
              newsArr.push(catArr[i]);
            };
          }
          }
        // console.log(newsArr.length);
        res
          .status(200)
          .send(newsArr);
        }
      })
      .catch((err) => {
        res
          .status(400)
          .send(err.message)
      })
},
getAllNews: (req, res) => {
  news
    .find()
      .then((data) => {
        let newData = [];
        newData = data.reverse();
        res
          .status(200)
          .send(newData);
      })
      .catch((err) => {
        res
          .status(400)
          .send(err)
      })
},
getOne: (req, res) => {
  news
     .findOne({_id: req.params.id})
        .then((data) => {
          if(!data) {
            console.log(data);
            res.status(404)
               .send({
               status: "failed",
               message: "data not found"
             })
          }
          res.status(200)
             .send(data)
        })
        .catch((err) => {
          res.status(400)
             .send(err.message)
        })
},
deleteNews: (req, res) => {
  news
    .findOneAndDelete({_id: req.params.id}, (err, deletedRecord) => {
      if (deletedRecord) {
        console.log(deletedRecord)
        res.status(200)
           .send({
            status: "Ok",
            message: "message deleted successfully",
            deletedUser: deletedRecord
          })
      } else {
        res.status(400)
          .send({
            record: err,
            message: "Record not found"
          })
      }
    })
},
updateNews: (req, res) => {
    const newsObj = req.body;
    const filter = {
      _id: req.params.id
    };
    let category = newsObj.category;
    category = category.toLowerCase();
    if (category === 'politics' || category === 'sports' || category === 'technology' || category === 'business' || category === 'culture' || category === 'entertainment') {
    newsObj.category = newsObj.category.charAt(0).toUpperCase() + newsObj.category.slice(1);
  news
    .findByIdAndUpdate(filter, newsObj, {new: true}, (err, data) => {
      if(!data) {
        res.status(400)
           .send({
             status: "failed", 
             message: "News not found"
           })
      } else {
      res.status(200)
         .send({
           status: "success",
           message: "News updated successfully",
           data: data
         });
        }
    });
  } else {
    res.status(400)
       .send({
         massage: "invalid category"
       })
  }
},
getTopStories: async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = limit * (page - 1);
    const options = {
      skip,
      limit
    };
    const topStories = await news.find({ topStory: true }, null, options).exec();
    if (!topStories) {
      res.status(400)
          .send({
            status: "failed",
            message: "record not found"
          });
          return;
    }
    res.status(200)
      .send({
        success: true,
        data: topStories
      });
  } catch (err) {
    console.log(err);
        res.status(400)
          .send({
            status: "failed",
            message: err.massage || "could not get records"
          })
          return;
  }
},
getEditorsPick: async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = limit * (page - 1);
    const options = {
      skip,
      limit
    };
    const editorsPick = await news.find({ editorsPick: true }, null, options).exec();
    if (!editorsPick) {
      res.status(400)
          .send({
            status: false,
            message: "record not found"
          });
          return;
    }
    res.status(200)
      .send({
        success: true,
        data: editorsPick
      });
  } catch (err) {
    console.log(err);
        res.status(400)
          .send({
            status: "failed",
            message: err.massage || "could not get records"
          })
          return;
  }
},
getFeatured: async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = limit * (page - 1);
    const options = {
      skip,
      limit
    };
    const featured = await news.find({ featured: true }, null, options).exec();
    if (!featured) {
      res.status(400)
          .send({
            status: false,
            message: "record not found"
          });
          return;
    }
    res.status(200)
      .send({
        success: true,
        data: featured
      });
  } catch (err) {
    console.log(err);
        res.status(400)
          .send({
            status: "failed",
            message: err.massage || "could not get records"
          })
          return;
  }
},
}