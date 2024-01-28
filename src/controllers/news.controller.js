const News = require("../models/news.model.js");

exports.getNews = (req, res) => {
  News.find().exec((err, result) => {
    res.status(200).json({
      msg: "Search OK",
      data: result,
    });
  });
};

exports.getNewsById = (req, res) => {
  News.findById(req.params.id).exec((err, result) => {
    res.status(200).json({
      msg: "Search OK",
      data: result,
    });
  });
};

exports.createNews = async (req, res) => {
  try {
    let news = new News({
      category: req.body.category,
      topic: req.body.topic,
      body: req.body.body,
      postedBy: req.body.postedBy,
    });
    let createdNews = await news.save();
    res.status(200).json({
      msg: "Add a news complete.",
      data: createdNews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

exports.updateNews = (req, res) => {
  let news = {
    //ข้อมูลใหม่
    category: req.body.category,
    topic: req.body.topic,
    body: req.body.body,
  };
  News.findByIdAndUpdate(req.params.id, news) //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
    .exec((err, result) => {
      // findById อีกครั้งเพื่อเอา data ใหม่
      Product.findById(req.params.id).exec((err, result) => {
        res.status(200).json({
          msg: "OK",
          data: result,
        });
      });
    });
};

exports.addNewsComment = async (req, res) => {
  let commentData = {
    $push: {
      comments: {
        message: req.body.message,
        postedBy: req.body.postedBy,
      },
    },
  };
  News.findByIdAndUpdate(req.params.id, commentData) //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
    .exec((err, result) => {
      // findById อีกครั้งเพื่อเอา data ใหม่
      News.findById(req.params.id).exec((err, result) => {
        res.status(200).json({
          msg: "OK",
          data: result,
        });
      });
    });
};

exports.deleteNewsById = async (req, res) => {
  News.findByIdAndDelete(req.params.id).exec((err, result) => {
    res.status(200).json({
      msg: "Delete OK",
    });
  });
};
