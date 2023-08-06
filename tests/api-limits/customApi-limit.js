// limit.js
const rateLimit = require('express-rate-limit');

const createLimiter = (maxRequests, intervalMs) => {
    return rateLimit({
        windowMs: intervalMs,
        max: maxRequests,
        message: `Too many requests, please try again later. Limit: ${maxRequests} requests per ${intervalMs / 1000} seconds.`,
    });
};

module.exports = createLimiter;
