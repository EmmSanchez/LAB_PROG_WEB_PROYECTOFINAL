const mongoose = require('mongoose')
// const mongodb = require('mongodb')

// Primero había error por la IP address
mongoose.connect('mongodb+srv://emmsanchez:rAw4dL567AeZDKdZ@clusterdeporteslogin.z6lhkmv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('mongodb connected')
  })
  .catch(() => {
    console.log('failed to connect')
  })

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  sport: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

const users = new mongoose.model('Users', LogInSchema)
const players = new mongoose.model('Players', PlayerSchema)

module.exports = { users, players }
