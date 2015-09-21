# replace-loader
[LoDash](http://lodash.com/docs#template) templates loader for [webpack](http://webpack.github.io/). The compiled string returned.

## Installation

```bash
npm install replace-loader
```

## Usage

```
body{
    background-color: <%= data.color %>;
}
```

```javascript
var obj = {
    color: '#000'
};

var template = require("replace!./file.txt?variable=data&val=" + JSON.stringify(obj));
// => returns the compiled string with lodash templating method.
console.log(template);
// body{
//     background-color: #000;
// }
```
## Config

This webpack config can load arbitrary text files.

```javascript
var obj = {
    color: '#000'
};
module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css!replace?variable=data&val=" + JSON.stringify(obj)) }
    ]
  }
};
```
is equivalent to

```javascript
var template = _.template('<%= data.name %>', {variable: 'data'})({color: '#000'});
```
