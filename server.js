const express = require('express');
const favicon = require('express-favicon');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = express();

server.use(favicon(__dirname + '/build/favicon.ico'));

server.use(express.static(__dirname));

server.use(express.static(path.join(__dirname, 'build')));

server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

http.createServer({}, server).listen(3000);