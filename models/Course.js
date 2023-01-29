const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const courseSchema = new Schema(
  // Add whichever fields you need for your app
  {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subcategories:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true
    },
    certificate:{
        type: Boolean,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    timestamps: {}
  }
);
 
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;