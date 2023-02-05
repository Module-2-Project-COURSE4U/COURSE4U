const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const offeredSchema = new Schema(
  // Add whichever fields you need for your app
  {
        place:String,
        logo:String
})
 
const Offered = mongoose.model('Offered', offeredSchema);

module.exports = Offered;