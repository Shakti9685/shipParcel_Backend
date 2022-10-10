const redis = require('redis');
const client = redis.createClient();

//const client = redis.createClient(port, host);


client.on('connect', function() {
    console.log('Redis is connected!');
  });