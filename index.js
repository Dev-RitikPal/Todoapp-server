const express = require('express');
const cors = require('cors')
require('dotenv').config();
require('./db/connectDB'); /*Database Connection */

const app = express()

// import routes
const authRoutes = require('./routes/auth');

app.use(express.json()); /* for checking the json data */
app.use(cors());

// middleware
app.use('/', authRoutes);

// PORT
const port = process.env.PORT || 3003;
app.listen(port, ()=> {
   console.log(`Server is running on port: ${port}`);
})