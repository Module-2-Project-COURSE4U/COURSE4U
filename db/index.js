require("dotenv").config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const MONGO_URI = process.env.MONGO_URL
  
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

