
require('dotenv').config()

const express = require('express')
    , app = express()
    , path = require('path')
    , bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.route('/')
  .get((req, res) => res.redirect('/bar_graph_one'))

app.route('/bar_graph_one')
  .get((req, res) => res.render('bar_graph_one'))

const server = app.listen(
  PORT
  , () => console.log(`${new Date().toLocaleTimeString('en-GB')}: Server initialising on PORT: ${PORT}...`)
)
