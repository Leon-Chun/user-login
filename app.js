const express = require('express')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000



//使用套件後產生的
const app = express()

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })) 
app.set('view engine', 'handlebars')

// user body get 
app.use(express.urlencoded({ extended: true }))

//router setting
app.get('/', (req, res) => {
  res.render('index') //本來是 res.send 改成 res.render
})

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
