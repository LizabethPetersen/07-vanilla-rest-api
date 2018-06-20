'use strict';

const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser.js');

const server = module.exports = {};

const app = http.createServer((req, res) => {
    bodyParser(req)
    .then(parsedRequest) => {
        if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsay') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
            name: new Name(),
            }));
            res.end();
            return undefined;
        }
    }
})