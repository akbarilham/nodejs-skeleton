'use strict'

const express = require('express')
const morgan = require('morgan')
const port = 3019
const host = '0.0.0.0'

const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/example', routes)
app.listen(port, host)
console.log('Running in http://'+host+':'+port+'/')

module.exports = app