const express = require("express");
const mongoose = require("mongoose");
const expressSanitizer = require("express-sanitizer");
const compression = require("compression");
const helmet = require("helmet");

const ipWhitelistMiddleware = require("./middleware/ipWhitelistMiddleware");
const rateLimiterMiddleware = require("./middleware/rateLimiterMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
const checkXRequestedWithMiddleware = require("./middleware/xRequestedWithMiddleware");
const morganMiddleware = require("./middleware/morganMiddleware");

module.exports = function (options) {
    const {
        // App port
        PORT = 8080,

        // MongoDB connection string
        DB_CONNECTION_STRING,

        // IP Whitelist options
        useIpWhitelist, ALLOWED_IPS,

        // Morgan options
        useMorgan, logFileName, logFolder, logInterval,

        // CORS options
        useCors, CORS_ALLOWED_ORIGINS,

        // Compression options
        useCompression,

        useProxy,

        useHelmet,

        disablePoweredBy,

        // X_REQUESTED_WITH header options
        useRequestedWithHeader, X_REQUESTED_WITH,

        // Rate limiter options
        useRateLimiter, RATE_LIMIT_MAX_TIME, RATE_LIMIT_MAX_REQUESTS,
    } = options;

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(expressSanitizer());

    if (useIpWhitelist) {
        app.use(ipWhitelistMiddleware(ALLOWED_IPS));
    }
    if (useMorgan) {
        app.use(morganMiddleware({
            logFileName,
            logFolder,
            logInterval,
        }));
    }
    if (useCors) {
        app.use(corsMiddleware(CORS_ALLOWED_ORIGINS));
    }
    if (useCompression) {
        app.use(compression());
    }
    if (useProxy) {
        app.set("trust proxy");
    }
    if (useHelmet) {
        app.use(helmet());
    }
    if (disablePoweredBy) {
        app.disable("x-powered-by");
    }
    if (useRequestedWithHeader) {
        app.use(checkXRequestedWithMiddleware(X_REQUESTED_WITH));
    }
    if (useRateLimiter) {
        app.use(rateLimiterMiddleware({
            RATE_LIMIT_MAX_TIME,
            RATE_LIMIT_MAX_REQUESTS,
        }));
    }

    const start = async () => {
        const APP_PORT = PORT;

        try {
            await mongoose.connect(
                DB_CONNECTION_STRING,
                {
                    autoIndex: true,
                },
            );

            app.listen(APP_PORT, () => console.log(`[INFO] Server started on port ${APP_PORT}`));
        } catch (error) {
            console.error("DB connect failed");
        }
    };

    start();

    return app;
};
