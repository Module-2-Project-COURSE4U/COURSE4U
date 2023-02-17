const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const contentSchema = new Schema(
  // Add whichever fields you need for your app
  {
    image:String,
    title:String,
    subtitle:String,
    time:String,
    title_description:String,
    description_1:String,
    description_2:String,
    description_3:String,
    description_4:String,
})
 
const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
