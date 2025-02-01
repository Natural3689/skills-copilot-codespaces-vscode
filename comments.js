// create web server

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = [];

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url, true).query;
    if (pathname == '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                console.log(err);
                res.end('server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname == '/comment') {
        var comment = query.comment;
        comments.push(comment);
        res.end('success');
    } else if (pathname == '/getComments') {
        var data = {
            comments: comments
        };
        res.end(JSON.stringify(data));
    }
}).listen(3000, '