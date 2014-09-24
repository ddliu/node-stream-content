'use strict';

var once = require('once');

exports.readAll = function(stream, encoding, cb) {
    cb = once(cb);
    var data = [];

    stream.on('error', cb);

    stream.on('data', function(chunk) {
        data.push(chunk);
    });

    stream.on('end', function(){

    });
};