const { createClient } = require('redis')
const { REDIS_HOST } = require('./config')

const client = createClient({
  url: `redis://${REDIS_HOST}:6379`
})

module.exports = client
