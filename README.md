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
var options = {
    variable: 'data'
};

var obj = {
    color: '#000'
};

var template = require("modify!./file.css?options="+ JSON.stringify(options) +"&value=" + JSON.stringify(obj));
// => returns the compiled string with lodash templating method.
console.log(template);
// body{
//     background-color: #000;
// }
```
## Config

This webpack config can load arbitrary text files.

```javascript
var options = {
    variable: 'data'
};

var obj = {
    color: '#000'
};

module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css!modify?options="+ JSON.stringify(options) +"&value=" + JSON.stringify(obj)) }
    ]
  }
};
```
is equivalent to

```javascript
var template = _.template('body{  background-color: <%= data.color %>;  }', {variable: 'data'})({color: '#000'});
```

> The `options` is optional, and the same as [lodash-template-options](https://lodash.com/docs#template)
