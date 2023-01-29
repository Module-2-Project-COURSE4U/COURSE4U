require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Course = require('../models/Course');
const courses = require('../data/courses');

mongoose.connect(process.env.MONGO_URL)
  .then(response => console.log(`Connected to the database ${response.connection.name}`))
  .then(() => Course.deleteMany({}))
  .then(() => Course.create(courses))
  .then(createdCourses => console.log(`Inserted ${createdCourses.length} courses in the database`))
  .then(() => mongoose.connection.close())
  .catch(err => console.error(err))