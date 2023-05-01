const cors = require("cors");

module.exports = function corsMiddleware(CORS_ALLOWED_ORIGINS) {
    return cors({
        credentials: true,

        // TODO: improve. cover all cases
        origin(origin, callback) {
            let condition = "";

            if (typeof CORS_ALLOWED_ORIGINS === "string") {
                if (CORS_ALLOWED_ORIGINS === "*") {
                    condition = true;
                } else {
                    condition = CORS_ALLOWED_ORIGINS === origin;
                }
            } else if (!Array.isArray(CORS_ALLOWED_ORIGINS)) {
                condition = CORS_ALLOWED_ORIGINS.indexOf(origin) !== -1;
            }

            if (condition) {
                callback(null, true);
            } else {
                callback("Not allowed by CORS!");
            }
        },
    });
};
