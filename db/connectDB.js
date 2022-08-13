const mongoose = require('mongoose');

// connect to db
mongoose.connect("mongodb://localhost:27017/todoapp", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true
   })
   .then(() => console.log("Database Connected"))
   .catch(err => console.log("DB connection error", err))