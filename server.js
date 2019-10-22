/*
 *   Rate Limited by User IP + Path / Params
 *   Basic rate-limiting middleware for Express.
 *   By Nathan Friedly : https://www.npmjs.com/package/express-rate-limit
 */

// Packages
const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");

/*
 *   NPM Package express-rate-limit
 *   Basic rate-limiting middleware for Express.
 *   By Nathan Friedly : https://www.npmjs.com/package/express-rate-limit
 */
const rateLimit = require("express-rate-limit");

// The API routes
const apiRouter = require("./routes/api");

//Create express app
const app = express();
const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV;


//Allows us to spoof the req.ip during testing
app.enable("trust proxy");


// Create limiter options
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute lock out
    max: 10, // limit to 10 requests per minute
    statusCode: 401,
    message: "Access Denied. API rate limit reached. Please wait before sending more request.",
    //Custom key 
    keyGenerator: req => {
        // Combines the users IP address and the request path an returns it as the key,
        // allowing us to rate limit on each endpoint by ip 
        let key = req.ip + req.url;
        return key;
    }
});

// Load Middleware
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.urlencoded({ extended: false }));
app.use("/", limiter);

// Load API Routes
app.use(apiRouter);

// 404 Hnadler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = MODE === "dev" ? err : {};

    // send error in json payload
    res.status(err.status || 500);
    res.json({ message: err.status });
});

app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}!`);
});

module.exports = app;