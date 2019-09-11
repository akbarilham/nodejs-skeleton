'use strict'

const express = require('express')
const path = require('path')
const logger = require('morgan')
const port = 3019
const host = '0.0.0.0'
const http = require('http')

const routes = require('./routes')

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use('/users-histories', routes)
app.listen(port, host)
console.log('Running in http://'+host+':'+port+'/')

module.exports = app