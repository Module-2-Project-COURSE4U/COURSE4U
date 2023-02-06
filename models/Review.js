const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const reviewSchema = new Schema(
  // Add whichever fields you need for your app
  {
    stars: {
        type: Number,
        required: true,
        min: 0,
        max: 5
      },
      comment: {
        type: String
      },
      username: {
        type: String
      },
      course: {
        type: Schema.Types.ObjectId, // Solo uno
        ref: 'Course'
      }
    })
 
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;