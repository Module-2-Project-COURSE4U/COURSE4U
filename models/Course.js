const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const courseSchema = new Schema(
  // Add whichever fields you need for your app
  {
    category: String,
    title: String,
    about:{
        description:
        {
            type: String,
            required: true
        },
        subdescription:String,
        list:Array
    },
    offered_by:{
        type: Schema.Types.ObjectId,
        ref: 'Offered_by'
    },
    features:{
        type: Schema.Types.ObjectId,
        ref: 'Offered_by'
    },
    skills:Array,
    content:{
        type: Schema.Types.ObjectId,
        ref: 'Content'
    },
    title_why:String,
    reasons:{
        type: Schema.Types.ObjectId,
        ref: 'Reasons'
    },
    timestamps: {}
  }
);
 
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;