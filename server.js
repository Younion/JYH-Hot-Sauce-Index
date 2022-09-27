const express = require('express')
const app = express()
const port = 3000

// post data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// templating engine
app.set('views', '/')
app.set('view engine', 'ejs')

// routes
const reviewsRouter = require('/index')

app.use('/', reviewsRouter)

// listen on port 3000
app.listen(port, function() {
  console.log(`Server is running on ${port}`);
})
