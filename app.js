const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

server = require('http').Server(app);

app.use('/streams', express.static(path.join(__dirname, '../node-rtsp-server/streams')));

server.listen(5200);