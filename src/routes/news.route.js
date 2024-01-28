const express = require('express');
const app = express.Router();
const controller = require('../controllers/news.controller')

app.get("/", controller.getNews);

app.get("/:id", controller.getNewsById);

app.post("/", controller.createNews);

app.put("/:id", controller.updateNews);

app.patch("/:id", controller.addNewsComment);

app.delete("/:id", controller.deleteNewsById);


module.exports = app;