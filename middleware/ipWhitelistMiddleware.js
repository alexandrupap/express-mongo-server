module.exports = function ipWhitelistMiddleware(ALLOWED_IPS) {
    return function (req, resp, next) {
        if ([ALLOWED_IPS || []].includes(req.connection.remoteAddress)) {
            next();
        } else {
            console.log("401 IP WHITELIST", req.connection.remoteAddress);
            resp.sendStatus(401);
        }
    };
};
