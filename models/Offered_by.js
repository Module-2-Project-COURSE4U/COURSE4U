const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const offered_bySchema = new Schema(
  // Add whichever fields you need for your app
  {
        place:String,
        logo:String
})
 
const Offered_by = mongoose.model('Offered_by', offered_bySchema);

module.exports = Offered_by;