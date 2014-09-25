'use strict';

var sc = require('./');
var fs = require('fs');
var should = require('should');

describe('readAll', function() {
    it('should readAll ok', function(done) {
        var file = 'package.json';
        var stream = fs.createReadStream(file);
        sc.readAll(stream, function(err, data) {
            should(err).not.be.ok;
            should(data).be.a.Buffer;
            should(data).eql(fs.readFileSync(file));
            done();
        });
    });
});

describe('writeAll', function() {
    var file = 'writeAll.tmp';
    var content = 'abc';
    it('should writeAll ok', function(done) {
        var stream = fs.createWriteStream(file);
        sc.writeAll(stream, content, function(err) {
            should(err).not.be.ok;
            should('abc').eql(fs.readFileSync(file, {encoding: 'utf8'}));
            done();
        });
    });

    after(function() {
        fs.unlinkSync(file);
    });
});

describe('createReadStream', function() {
    it('should createReadStream ok', function(done) {
        var content = 'hello world';
        var stream = sc.createReadStream(content);
        sc.readAll(stream, 'utf8', function(err, data) {
            should(err).not.be.ok;
            should(data).eql(content);
            done();
        });
    });
}); 

describe('createReadStreamFromCallback', function() {
    it('should createReadStreamFromCallback ok', function(done) {
        var file = 'package.json';
        var stream = sc.createReadStreamFromCallback(function(cb) {
            fs.readFile(file, cb);
        });

        sc.readAll(stream, function(err, data) {
            should(err).not.be.ok;
            should(data).be.a.Buffer;
            should(data).eql(fs.readFileSync(file));
            done();
        });
    });
});

describe('createWriteStreamFromCallback', function() {
    var file = 'createWriteStreamFromCallback.tmp';
    var content = 'abc';
    it('should createWriteStreamFromCallback ok', function(done) {
        var stream = sc.createWriteStreamFromCallback(function(content, cb) {
            fs.writeFile(file, content, cb);
        });

        sc.writeAll(stream, content, function(err) {
            should(err).not.be.ok;
            should('abc').eql(fs.readFileSync(file, {encoding: 'utf8'}));
            done();
        });
    });

    after(function() {
        fs.unlinkSync(file);
    });
});