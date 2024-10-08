import http from 'http'; //const http = require('http'); // http is a built-in module
import os from 'os'; //const os = require('os'); // os is a built-in module
import fs from  'fs'; //const fs = require('fs'); // fs is a built-in module
import { formatSystemInfo } from './systemUtils.mjs'; //const { formatSystemInfo } = require('./systemUtils.mjs'); // systemUtils is a custom module

const server = http.createServer((req, res) => {
  // Using if/else statements is not the best way to handle routing, but works for this example
  if (req.url === '/data') {
    const uptime = os.uptime();
    const totalMemory = os.totalmem();
    const systemInfo = formatSystemInfo(uptime, totalMemory);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(systemInfo));
  } else if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Error loading index.html');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
   
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 not found');
  }
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
