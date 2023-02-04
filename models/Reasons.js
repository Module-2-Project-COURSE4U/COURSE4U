const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const reasonsSchema = new Schema(
  // Add whichever fields you need for your app
  {
    subtitle:String,
    list:Array,
    description:String
})
 
const Reasons = mongoose.model('Reasons', reasonsSchema);

module.exports = Reasons;