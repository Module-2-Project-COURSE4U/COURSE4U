const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const MONGO_URI =
  process.env.MONGODB_URL ||'mongodb+srv://admin:admin@cluster0.p7p1ppk.mongodb.net/Course4U_DB'
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

