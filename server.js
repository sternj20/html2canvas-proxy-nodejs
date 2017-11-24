
var port = (process.env.PORT || 3000);
const express = require('express');
const url = require('url');
const cors = require('cors');
var request = require('request')
var app = express();
function validUrl(req, res, next) {
    if (!req.query.url) {
        next(new Error('No url specified'));
    } else if (typeof req.query.url !== 'string' || url.parse(req.query.url).host === null) {
        next(new Error(`Invalid url specified: ${req.query.url}`));
    } else {
        next();
    }
}

// const router = express.Router();
app.get('/', cors(), validUrl, (req, res, next) => {
        // console.log(req.query)
        let options = req.query.url
        // options += "&Signature=P4DN9uv5vfNHZ6oTzY2CfQdvzXcoNb5u8nEJRn8aVNV2FaFZ1wW3xbf48E7Y7jJ~tofOXRN9X0y2mrJMhaanaJ-c7rb6DwYO9yd~T6rGxrMkW7VSHmxKVeCdgFV-4lpVVY7-A-rxvXaQX~adJA9eo~mbYQui12FGmSGu5it6Q9wtVVJW6xkltWKgTus-3-8HLOSGWnH0s9KZYxz-LEJ74P4dfvyDPGuTMvAfy2hNZLufFlWAsXgrX4p0kjENaXq~~G0aUZvhLzZXbBqruBufBt4o4cWZRQFKAeez9rSfueqvFA8cd6M6iOi6XPfYpTQBwfuNO04qhJnflpsFiLwh6A__&Key-Pair-Id=APKAJXGC45PGQXCMCXSA"
        // options = "https://public-tiles.dronedeploy.com/a11cf8293a_JESSESTERNOPENPIPELINE_ortho_moo/20/242484/412020.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wdWJsaWMtdGlsZXMuZHJvbmVkZXBsb3kuY29tL2ExMWNmODI5M2FfSkVTU0VTVEVSTk9QRU5QSVBFTElORV9vcnRob19tb28vKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MjE0NTkxNjU1OX19fV19&Signature=P4DN9uv5vfNHZ6oTzY2CfQdvzXcoNb5u8nEJRn8aVNV2FaFZ1wW3xbf48E7Y7jJ~tofOXRN9X0y2mrJMhaanaJ-c7rb6DwYO9yd~T6rGxrMkW7VSHmxKVeCdgFV-4lpVVY7-A-rxvXaQX~adJA9eo~mbYQui12FGmSGu5it6Q9wtVVJW6xkltWKgTus-3-8HLOSGWnH0s9KZYxz-LEJ74P4dfvyDPGuTMvAfy2hNZLufFlWAsXgrX4p0kjENaXq~~G0aUZvhLzZXbBqruBufBt4o4cWZRQFKAeez9rSfueqvFA8cd6M6iOi6XPfYpTQBwfuNO04qhJnflpsFiLwh6A__&Key-Pair-Id=APKAJXGC45PGQXCMCXSA"
        // options = "https://s7d1.scene7.com/is/image/PETCO/dog-category-090617-369w-269h-hero-cutout-d?fmt=png-alpha"
        console.log (options)
        
        switch (req.query.responseType) {
            case 'blob':
            console.log('blob')

            req.pipe(request(req.query.url).on('error', next)).pipe(res);
            break;
            case 'text':
            console.log('text')
            default:
            console.log('default')


            request(options, (error, response, body) => {
                if (error) {
                    return next(error);
                }
            // console.log(response)
            console.log(body)
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