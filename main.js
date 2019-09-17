'use strict'
require('env2')('.env')

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const port = process.env.PORT
const host = process.env.HOST
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use('/example', routes)
app.listen(port, host)
console.log('Running in http://'+host+':'+port+'/')

module.exports = app