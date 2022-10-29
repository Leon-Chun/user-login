const mongoose = require('mongoose')
const userDB = require('../userDB')
const userList = require('../../user.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  
  userDB.create(userList)
    .then(() => {
      console.log("userSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})