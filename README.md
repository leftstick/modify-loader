# modify-loader
[LoDash](http://lodash.com/docs#template) templates loader for [webpack](http://webpack.github.io/). The compiled string returned.

## Installation

```bash
npm install modify-loader --save-dev
```

## Usage

*file.css*

```css
body{
    background-color: <%= data.color %>;
}
```

```javascript
var obj = {
    color: '#000'
};

var template = require("modify!./file.css?variable=data&val=" + JSON.stringify(obj));
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
      { test: /\.css$/, loader: "style!css!modify?variable=data&val=" + JSON.stringify(obj)) }
    ]
  }
};
```
is equivalent to

```javascript
var template = _.template('body{  background-color: <%= data.color %>;  }', {variable: 'data'})({color: '#000'});
```

> Once you have an `Object` wants to be passed to the loader, `JSON.stringify` is mandatory and must set to `val`
