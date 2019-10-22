/*
 *   Rate Limited by User IP + Path / Params
 *   Basic rate-limiting middleware for Express.
 *   By Nathan Friedly : https://www.npmjs.com/package/express-rate-limit
 */
const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

/*
 *   NPM Package express-rate-limit
 *   Basic rate-limiting middleware for Express.
 *   By Nathan Friedly : https://www.npmjs.com/package/express-rate-limit
 */
const rateLimit = require("express-rate-limit");

// The API endpoints
const apiRouter = require("./routes/api");

//Creates our express app
const app = express();
const PORT = process.env.PORT || 3000;

// Create limiter options
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // limit each IP to 10 requests per minute
    statusCode: 401,
    message: "Access Denied. API rate limit reached. Please wait before sending more request.",
    keyGenerator: req => {
        // Combines the users IP address and the request path an returns it as the key
        let key = req.ip + req.url;
        return key;
    }
});

// Load Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.urlencoded({ extended: false }));
//Load middleware limiter on all routes
app.use("/", limiter);

// Load API Routes
app.use(apiRouter);

// Catch 404's and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ message: err.status });
});

app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}!`);
});

module.exports = app;