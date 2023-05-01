const morgan = require("morgan");
const rfs = require("rotating-file-stream");

function accessLogStream(options) {
    const { logFileName, logFolder, logInterval } = options;

    return rfs.createStream(logFileName, {
        interval: logInterval,
        path: logFolder,
    });
}

function morganMiddleware(options) {
    return morgan("combined", {
        stream: accessLogStream(options),
    });
}

module.exports = morganMiddleware;
