require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Course = require('../models/Course');
const Content = require('../models/Content');
const Features = require('../models/Features');
const Offered = require('../models/Offered');
const Reasons = require('../models/Reasons');

const courses = require('../data/courses');
const { content__1, content__2, content__3, content__4, content__5, content__6, content__7, content__8, content__9 } = require('../data/content');
const { features__1, features__2, features__3, features__4, features__5, features__6, features__7, features__8, features__9 } = require('../data/features');
const { reasons__6, reasons__7, reasons__8, reasons__9} = require('../data/reasons');
const { offered__GOOGLE__1_2_3_4_5, offered__IRONHACK__6_7_8_9 } = require('../data/offered');
 
let all_courses;
let offered;

mongoose.connect(process.env.MONGO_URL)
  .then(response => console.log(`Connected to the database ${response.connection.name}`))
  .then(() => Course.deleteMany({}))
  .then(() => Offered.deleteMany({}))
  .then(() => Features.deleteMany({}))
  .then(() => Content.deleteMany({}))  
  .then(() => Reasons.deleteMany({}))

  
  .then(() => Course.create(courses))
  .then((courses) => all_courses = courses)
    
    // Offered Create & Populate
    .then(() => Offered.create(offered__GOOGLE__1_2_3_4_5))
    .then((createdoffered) => offered = createdoffered)
    .then(() => Course.findByIdAndUpdate(all_courses[0].id, { $push: { offered: offered.id } }))
    .then(() => Course.findByIdAndUpdate(all_courses[1].id, { $push: { offered: offered.id } }))
    .then(() => Course.findByIdAndUpdate(all_courses[2].id, { $push: { offered: offered.id } }))
    .then(() => Course.findByIdAndUpdate(all_courses[3].id, { $push: { offered: offered.id } }))
    .then(() => Course.findByIdAndUpdate(all_courses[4].id, { $push: { offered: offered.id } }))
    .then(() => Course.findByIdAndUpdate(all_courses[5].id, { $push: { offered: offered.id } }))
    .then(() => Offered.create(offered__IRONHACK__6_7_8_9))
    .then((offered) => offered = offered)
    .then(() => Course.findByIdAndUpdate(all_courses[5].id, { $push: { offered: offered.id } }))
    // MY COURSES
    // .then(() => User.findByIdAndUpdate(id.user, { $push: { courses: courses.id } }))
    .then(() => Course.findByIdAndUpdate(all_courses[6].id, { $push: { offered: offered.id } }))
    .then(() => Course.findByIdAndUpdate(all_courses[7].id, { $push: { offered: offered.id } }))
    .then(() => Course.findByIdAndUpdate(all_courses[8].id, { $push: { offered: offered.id } }))
    
    // Features Create & Populate
    // 1º
    .then(() => Features.create(features__1))
    .then((features) => {
      let features_ids = []
      features.forEach(elem => features_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[0].id, { $push: { features: { $each: features_ids } } })})
    // 2º
    .then(() => Features.create(features__2))
    .then((features) => {
      let features_ids = []
      features.forEach(elem => features_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[1].id, { $push: { features: { $each: features_ids } } })})
    // 3º
    .then(() => Features.create(features__3))
    .then((features) => {
      let features_ids = []
      features.forEach(elem => features_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[2].id, { $push: { features: { $each: features_ids } } })})
    // 4º
    .then(() => Features.create(features__4))
    .then((features) => {
      let features_ids = []
      features.forEach(elem => features_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[3].id, { $push: { features: { $each: features_ids } } })})
    // 5º
    .then(() => Features.create(features__5))
    .then((features) => {
      let features_ids = []
      features.forEach(elem => features_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[4].id, { $push: { features: { $each: features_ids } } })})
    // 6º
    .then(() => Features.create(features__6))
    .then((features) => {
      let features_ids = []
      features.forEach(elem => features_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[5].id, { $push: { features: { $each: features_ids } } })})
    // 7º
    .then(() => Features.create(features__7))
    .then((features) => {
      let features_ids = []
      features.forEach(elem => features_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[6].id, { $push: { features: { $each: features_ids } } })})
    // 8º
    .then(() => Features.create(features__8))
    .then((features) => {
      let features_ids = []
      features.forEach(elem => features_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[7].id, { $push: { features: { $each: features_ids } } })})
    // 9º
    .then(() => Features.create(features__9))
    .then((features) => {
      let features_ids = []
      features.forEach(elem => features_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[8].id, { $push: { features: { $each: features_ids } } })})

    // Content Create & Populate
    // 1º
    .then(() => Content.create(content__1))
    .then((content) => {
      let content_ids = []
      content.forEach(elem => content_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[0].id, { $push: { content: { $each: content_ids } } })
    })
    // 2º
    .then(() => Content.create(content__2))
    .then((content) => {
      let content_ids = []
      content.forEach(elem => content_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[1].id, { $push: { content: { $each: content_ids } } })
    })
    // 3º
    .then(() => Content.create(content__3))
    .then((content) => {
      let content_ids = []
      content.forEach(elem => content_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[2].id, { $push: { content: { $each: content_ids } } })
    })
    // 4º
    .then(() => Content.create(content__4))
    .then((content) => {
      let content_ids = []
      content.forEach(elem => content_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[3].id, { $push: { content: { $each: content_ids } } })
    })
    // 5º
    .then(() => Content.create(content__5))
    .then((content) => {
      let content_ids = []
      content.forEach(elem => content_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[4].id, { $push: { content: { $each: content_ids } } })
    })
    // 6º
    .then(() => Content.create(content__6))
    .then((content) => {
      let content_ids = []
      content.forEach(elem => content_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[5].id, { $push: { content: { $each: content_ids } } })
    })
    // 7º
    .then(() => Content.create(content__7))
    .then((content) => {
      let content_ids = []
      content.forEach(elem => content_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[6].id, { $push: { content: { $each: content_ids } } })
    })
    // 8º
    .then(() => Content.create(content__8))
    .then((content) => {
      let content_ids = []
      content.forEach(elem => content_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[7].id, { $push: { content: { $each: content_ids } } })
    })
    // 9º
    .then(() => Content.create(content__9))
    .then((content) => {
      let content_ids = []
      content.forEach(elem => content_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[8].id, { $push: { content: { $each: content_ids } } })
    })

    // Reasons Create & Populate
    // 6º
    .then(() => Reasons.create(reasons__6))
    .then((reasons) => {
      let reasons_ids = []
      reasons.forEach(elem => reasons_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[5].id, { $push: { reasons: { $each: reasons_ids } } })
    })
    // 7º
    .then(() => Reasons.create(reasons__7))
    .then((reasons) => {
      let reasons_ids = []
      reasons.forEach(elem => reasons_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[6].id, { $push: { reasons: { $each: reasons_ids } } })
    })
    // 8º
    .then(() => Reasons.create(reasons__8))
    .then((reasons) => {
      let reasons_ids = []
      reasons.forEach(elem => reasons_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[7].id, { $push: { reasons: { $each: reasons_ids } } })
    })
    // 9º
    .then(() => Reasons.create(reasons__9))
    .then((reasons) => {
      let reasons_ids = []
      reasons.forEach(elem => reasons_ids.push(`${elem.id}`))
      return Course.findByIdAndUpdate(all_courses[8].id, { $push: { reasons: { $each: reasons_ids } } })
    })

  .then(() => Course.find({}))
  .then((createdCourses) => console.log(`Inserted ${createdCourses.length} courses in the database`))
  .then(() => mongoose.connection.close())
  .catch(err => console.error(err))