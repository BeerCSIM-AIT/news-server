const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  category: { type: String, required: true },
  topic: { type: String, required: true },
  body: { type: String, required: true },
  postedBy: { type: String, required: true },
  comments:[
    { message: String, postedBy: String }
  ],
},{ timestamps: true } );

module.exports = mongoose.model("News", newsSchema);