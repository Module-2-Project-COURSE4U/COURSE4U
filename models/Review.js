const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const reviewSchema = new Schema(

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
        type: Schema.Types.ObjectId, 
        ref: 'User'
      },
      course: {
        type: Schema.Types.ObjectId, 
        ref: 'Course'
      }
    })
 
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;