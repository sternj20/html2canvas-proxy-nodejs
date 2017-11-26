
const port = (process.env.PORT || 3000);
const express = require('express');
const app = express();
const url = require('url');
const cors = require('cors');
const request = require('request');

function validUrl(req, res, next) {
    if (!req.query.url) {
        next(new Error('No url specified'));
    } else if (typeof req.query.url !== 'string' || url.parse(req.query.url).host === null) {
        next(new Error(`Invalid url specified: ${req.query.url}`));
    } else {
        next();
    }
}

app.get('/', cors(), validUrl, (req, res, next) => {

    switch (req.query.responseType) {
        case 'blob':
        req.pipe(request(req.query.url).on('error', next)).pipe(res);
        break;
        case 'text':
        default:
        let url = ''
        url += req.query.url
        url += `&Signature=${req.query.Signature}`
        url += `&Key-Pair-Id=${req.query["Key-Pair-Id"]}`
        console.log(url)
        request({url: url, encoding: 'binary'}, (error, response, body) => {
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

app.listen(port);