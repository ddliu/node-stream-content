'use strict';

var once = require('once');
var Readable = require('stream').Readable;
var Writable = require('stream').Writable;
var inherits = require('util').inherits;

exports.readAll = function(stream, encoding, cb) {
    if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
    }

    cb = once(cb);
    var data = [];

    stream.on('error', cb);

    stream.on('data', function(chunk) {
        data.push(chunk);
    });

    stream.on('end', function(){
        if (data.length === 0) {
            return cb(null, encoding?'':new Buffer(''));
        }

        if (typeof data[0] === 'string') {
            data = data.join('');
            cb(null, data);
        } else if (Buffer.isBuffer(data[0])) {
            data = Buffer.concat(data);
            cb(null, encoding?data.toString(encoding):data);
        } else {
            cb(new Error('Invalid data type:' + typeof data[0]));
        }
    });
};

exports.writeAll = function (stream, content, encoding, cb) {
    if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
    }

    cb = once(cb);
    stream.on('error', cb);
    stream.on('finish', cb);

    stream.end(content, encoding);
};

inherits(SimpleReadable, Readable);

function SimpleReadable(contentBuffer) {
    this._content = contentBuffer;
    Readable.call(this);
}

SimpleReadable.prototype._read = function(size) {
    this.push(this._content);
    this.push(null);
};

exports.createReadStream = function (content, encoding) {
    if (typeof content === 'string') {
        content = new Buffer(content, encoding);
    }

    return new SimpleReadable(content);
};

inherits(CallbackReadable, Readable);

function CallbackReadable(fn) {
    this._fn = fn;
    Readable.call(this);
}

CallbackReadable.prototype._read = function(size) {
    var self = this;
    this._fn(function(err, data) {
        if (err) {
            self.emit('error', err);
        } else {
            self.push(data);
            self.push(null);
        }
    });
};

exports.createReadStreamFromCallback = function(fn) {
    return new CallbackReadable(fn);
}

inherits(CallbackWritable, Writable);

function CallbackWritable(fn) {
    this._fn = fn;
    this._data = [];
    Writable.call(this);
}

CallbackWritable.prototype._write = function(chunk, encoding, cb) {
    if (typeof chunk === 'string') {
        chunk = new Buffer(chunk, encoding);
    }

    this._data.push(chunk);
    if (this._cb) {
        this._cb();
    }
    this._cb = cb;
}

CallbackWritable.prototype.end = function(chunk, encoding, callback) {
    Writable.prototype.end.call(this, chunk, encoding, callback);
    if (this._data.length && this._cb) {
        this._fn(Buffer.concat(this._data), this._cb);
    }
};

exports.createWriteStreamFromCallback = function(fn) {
    return new CallbackWritable(fn);
}