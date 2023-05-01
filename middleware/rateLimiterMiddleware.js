const { rateLimit } = require("express-rate-limit");

module.exports = function rateLimiterMiddleware(options) {
    const { RATE_LIMIT_MAX_TIME, RATE_LIMIT_MAX_REQUESTS } = options;

    return rateLimit({
        // 10 requests in 5 seconds
        // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        windowMs: RATE_LIMIT_MAX_TIME,
        max: RATE_LIMIT_MAX_REQUESTS,
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        store: new rateLimit.MemoryStore(),
    });
};
