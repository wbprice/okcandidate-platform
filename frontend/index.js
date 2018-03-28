'use strict';

// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel

const express = require('express');
const exp = express();
const proxy = require('http-proxy-middleware');
const { parse } = require('url')
const next = require('next')
const path = require('path');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {

  exp.all('/api*', proxy('http://0.0.0.0:8080/api'));

  exp.get('/*', (req, res) => {
    return handle(req, res, parse(req.url, true));
  });

  exp.listen(3000, (err) => {
    if (err) throw err;
    console.log('Listening on 3000');
  });
})