# stream-content [![Build Status](https://travis-ci.org/ddliu/node-stream-content.png)](https://travis-ci.org/ddliu/node-stream-content)

Convert between stream and buffer(or string).

[![npm](https://img.shields.io/npm/v/stream-content.svg?style=flat-square)](https://www.npmjs.com/package/stream-content)
[![npm](https://img.shields.io/npm/dm/stream-content.svg?style=flat-square)](https://www.npmjs.com/package/stream-content)
[![Travis](https://img.shields.io/travis/ddliu/node-stream-content.svg?style=flat-square)](https://travis-ci.org/ddliu/node-stream-content)
![npm](https://img.shields.io/npm/l/stream-content.svg?style=flat-square)

## Usage

```js
var sc = require('stream-content');
```

### `readAll(readableStream, [encoding], callback)`

Read content from a readable stream.

```js
sc.readAll(readableStream, encoding, function(err, data) {
    console.log(data);
});
```

### `writeAll(writableStream, content, [encoding], callback)`

Write content into a writable stream.

```js
sc.writeAll(writableStream, 'hello world', function(err) {
    console.log('done');
});
```

### `createReadableStream(content, [encoding])`

Create a readable stream from content.

```js
sc.createReadableStream('hello world').pipe(process.stdout);
```

### `createReadableStreamFromCallback(fn)`

Create a readable stream from callback of a function.

```js
sc.createReadableStreamFromCallback(function(cb) {
    setTimeout(function() {
        cb('hello world');
    }, 1000);
});
```

### `createWritableStreamFromCallback(fn)`

Create a writable stream from callback of a function.

```js
sc.createWritableStreamFromCallback(function(content, cb) {
    fs.writeFile('file.txt', content, cb);
});
```