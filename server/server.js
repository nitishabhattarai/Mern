require('dotenv').config({ path: "./config.env" })
const port = process.env.PORT || 5000

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require('./routes/workouts')

// express app
const app = express();

// middleware
app.use(express.json())

app.use((req, res, next)=>{
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts',workoutRoutes)
app.use(require("./routes/record"));


// connect to db
mongoose.connect(process.env.ATLAS_URI)
.then(()=>{
  // listen for requests
  app.listen(port, ()=>{
    console.log('connected to db & listening on port', port)
  })
})
.catch((error)=>{
  console.log(error)
})
