const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    subdescription: {
      type: String
    },
    list: {
      type: Array
    },
    content: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Content'
      }
    ],
    features: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Features'
      }
    ],
    reasons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reasons'
      }
    ],
    offered: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Offered'
      }
    ],
    skills: {
      type: Array
    },
    title_why: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
