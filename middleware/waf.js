module.exports = (req, res, next) => {
    const blacklistedPatterns = [
        /<script.*?>/i,                  
        /\$ne|\$or|\$gt|\$lt|\$in|\$regex/i,  
        /\b(?:eval|expression|javascript:|data:text\/html)/i  
    ];

    const requestData = JSON.stringify(req.body) + req.url + JSON.stringify(req.query) + JSON.stringify(req.headers) + JSON.stringify(req.params);

    for (let pattern of blacklistedPatterns) {
        if (pattern.test(requestData)) {
            console.log("Potential attack detected: ", requestData);
            return res.status(403).send('Forbidden: Potential attack detected.');
        }
    }
    next();
};
