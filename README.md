# stream-content

Convert between stream and buffer(or string).

## Usage

```js
var sc = require('stream-content');
```

### `readAll(readableStream, [encoding,] callback)`

Read content from a readable stream.

```js
sc.readAll(readableStream, encoding, function(err, data) {
    console.log(data);
});
```

### `writeAll(writableStream, content, [encoding,] callback)`

Write content into a writable stream.

```js
sc.writeAll(writableStream, 'hello world', function(err) {
    console.log('done');
});
```

### `createReadableStream(content, encoding)`

Create a readable stream from content.

```js
sc.createReadableStream('hello world').pipe(process.stdout);
```

## Changelog

### v0.1.0 (2014-09-24)

Initial release