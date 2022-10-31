const express = require('express')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const userDB = require('./models/userDB')



//使用套件後產生的
const app = express()

// dotenv setting
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })) 
app.set('view engine', 'handlebars')

// user body get 
app.use(express.urlencoded({ extended: true }))

//database setting 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => { // 連線異常
  console.log('mongodb error')
})
db.once('open', () => { // 連線成功
  console.log('mongodb connected')
})

//router setting
app.get('/', (req, res) => {
  res.render('index') //本來是 res.send 改成 res.render
})

app.post('/user_authentication/login',(req, res) => {
  //get req.body.floatingInput / req.body.floatingPassword
  const email = req.body.floatingInput
  const password = req.body.floatingPassword

  userDB.find({email , password})
    .lean()
    .then(userdata => {
      if(userdata.length){
        res.render('success')
      }else{
        res.render('index',{error:"error"})
      }
    })
    .catch(err => console.log(err))

})

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
