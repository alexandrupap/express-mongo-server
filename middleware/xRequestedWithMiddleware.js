module.exports = function checkXRequestedWithMiddleware(X_REQUESTED_WITH) {
    return function (req, res, next) {
        if (req.headers["x-requested-with"] === X_REQUESTED_WITH) {
            next();
        } else {
            console.log("401 x-requested-with");
            res.sendStatus(401);
        }
    };
};
