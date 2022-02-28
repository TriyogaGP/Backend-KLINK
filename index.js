const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const koneksi = require('./config/db');
const logger = require('morgan');
const dotenv = require('dotenv');
const { response } = require('./config');
const cors = require('cors');
const indexRouter = require('./routes/index');
dotenv.config();
const { REDIS_ENDPOINT_URI, REDIS_HOST, REDIS_PORT, PORT } = process.env;
const app = express();
const redisEndpointUri = REDIS_ENDPOINT_URI
    ? REDIS_ENDPOINT_URI.replace(/^(redis\:\/\/)/, '')
    : `${REDIS_HOST}:${REDIS_PORT}`;
const redisClient = redis.createClient(`redis://${redisEndpointUri}`);
redisClient.on('connect', function(){
    console.log('connected to redis')
})
const port = PORT || 3000;


app.use(logger('dev'));
app.use(express.json());
app.use(
    cors({
        origin(origin, callback) {
            callback(null, true);
        },
        credentials: true
    })
);

indexRouter(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = app;