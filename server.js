const express = require('express');
const url = require('url');
const cors = require('cors');
const request = require('request');
const port = (process.env.PORT || 3000);
const app = express();
const router = express.Router();


function validUrl(req, res, next) {
    if (!req.query.url) {
        next(new Error('No url specified'));
    } else if (typeof req.query.url !== 'string' || url.parse(req.query.url).host === null) {
        next(new Error(`Invalid url specified: ${req.query.url}`));
    } else {
        next();
    }
}

    router.get('/', cors(), validUrl, (req, res, next) => {
        console.log(req.query)
        switch (req.query.responseType) {
    case 'blob':
        req.pipe(request(req.query.url).on('error', next)).pipe(res);
        break;
    case 'text':
    default:
        request({url: req.query.url, encoding: 'binary'}, (error, response, body) => {
            if (error) {
                return next(error);
            }
            res.send(
            `data:${response.headers['content-type']};base64,${Buffer.from(
                body,
                'binary'
            ).toString('base64')}`
        );
    });
    }
});




console.log("Server running on port", port);

app.use('/', router)
app.listen(port);