'use strict'
require('env2')('.env')

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const fs = require('fs')
const toml = require('toml')
const restConfig = toml.parse(fs.readFileSync('config/rest.toml', 'utf-8'))
const routes = require('./routes')
const port = restConfig.PORT
const http = restConfig.HTTP
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use('/example', routes)
app.listen(port, http)
console.log('Running in http://'+http+':'+port+'/')

module.exports = app