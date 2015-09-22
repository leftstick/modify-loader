# modify-loader
==================

[![NPM version][npm-image]][npm-url]
![][david-url]

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
var querys = JSON.stringify({
    options: {
        variable: 'data'
    },
    value: {
        color: '#000'
    }
});

var template = require("modify!./file.css?"+ querys);
// => returns the compiled string with lodash templating method.
console.log(template);
// body{
//     background-color: #000;
// }
```
## Config

This webpack config can load arbitrary text files.

```javascript
var querys = JSON.stringify({
    options: {
        variable: 'data'
    },
    value: {
        color: '#000'
    }
});

module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css!modify?" + querys }
    ]
  }
};
```
is equivalent to

```javascript
var template = _.template('body{  background-color: <%= data.color %>;  }', {variable: 'data'})({color: '#000'});
```

> The `options` is optional, and the same as [lodash-template-options](https://lodash.com/docs#template)
> The `value` will be used as interpolated data

## Special Case

Since `JSON` doesn't support regular expression, so it's not possible to pass a `RegExp` directly, which means for following options, we need workaround for them:

- escape
- evaluate
- interpolate

For solving this issue, we pass `Object` which contains `pattern` and `attributes` as following:

```javascript
var querys = JSON.stringify({
    options: {
        variable: 'data',
        interpolate: {
            pattern: '%([\\s\\S]+?)%',
            attributes: 'g'
        }
    },
    value: {
        color: '#000'
    }
});

module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css!modify?" + querys }
    ]
  }
};
```


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/modify-loader/master/LICENSE)




[npm-url]: https://npmjs.org/package/modify-loader
[npm-image]: https://badge.fury.io/js/modify-loader.png
[david-url]: https://david-dm.org/leftstick/modify-loader.png
