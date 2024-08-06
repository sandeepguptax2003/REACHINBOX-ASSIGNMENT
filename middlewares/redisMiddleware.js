const Redis = require("ioredis");
require("dotenv").config();

const redisConnection = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS
}, {
    maxRetriesPerRequest: null
});

module.exports = {
    redisConnection
};