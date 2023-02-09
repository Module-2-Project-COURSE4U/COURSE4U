const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const featuresSchema = new Schema(
  // Add whichever fields you need for your app
  {
    svg:{
      type:String,
      default:true
    },
    title:String,
    subtitle:String
    
})
 
const Features = mongoose.model('Features', featuresSchema);

module.exports = Features;