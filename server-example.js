const expressMongoServer = require("./express-mongo-server");

require("dotenv").config();

const app = expressMongoServer({
    // App port
    PORT: 8080,

    // MongoDB connection string
    DB_CONNECTION_STRING: "mongodb://0.0.0.0:27017/test_db",

    // IP Whitelist options
    useIpWhitelist: false,
    ALLOWED_IPS: ["::1"],

    // CORS options
    useCors: true,
    CORS_ALLOWED_ORIGINS: "*",

    // Morgan options
    useMorgan: true,
    logFolder: "./log",
    logFileName: "access.log",
    logInterval: "1d",

    // X_REQUESTED_WITH header options
    useRequestedWithHeader: false,
    X_REQUESTED_WITH: "MY_APP",

    // Rate limiter options
    useRateLimiter: true,
    // In miliseconds
    RATE_LIMIT_MAX_TIME: 5000,
    // Number
    RATE_LIMIT_MAX_REQUESTS: 10,

    // Other options
    useCompression: true,
    useProxy: true,
    useHelmet: true,
    disablePoweredBy: true,
});

app.use("/", (req, resp) => {
    resp.send("OK from api");
});
