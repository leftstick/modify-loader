var loader = require('../');
var should = require('should');

describe('basic test', function() {
    'use strict';

    it('all good', function(done) {
        var querys = JSON.stringify({
            options: {
                variable: 'data'
            },
            value: {
                color: '#000'
            }
        });

        var ctx = {
            query: '?' + querys,
            callback: function(err, value) {
                should(value).eql('body{  background-color: #000;  }', 'output incorrect');
                done();
            }
        };
        loader.bind(ctx)('body{  background-color: <%= data.color %>;  }');
    });

    it('without options', function(done) {
        var query = JSON.stringify({value: {color: '#000'}});

        var ctx = {
            query: '?' + query,
            callback: function(err, value) {
                should(value).eql('body{  background-color: #000;  }', 'output incorrect');
                done();
            }
        };
        loader.bind(ctx)('body{  background-color: <%= color %>;  }');
    });

    it('without value', function(done) {
        var ctx = {
            callback: function(err, value) {
                should(value).eql('body{  background-color: #000;  }', 'output incorrect');
                done();
            }
        };
        loader.bind(ctx)('body{  background-color: #000;  }');
    });

    it('change interpolate', function(done) {
        var querys = JSON.stringify({
            options: {
                variable: 'data',
                interpolate: {
                    pattern: '%([\\s\\S]+?)%'
                }
            },
            value: {
                color: '#000'
            }
        });

        var ctx = {
            query: '?' + querys,
            callback: function(err, value) {
                should(value).eql('body{  background-color: #000;  }', 'output incorrect');
                done();
            }
        };
        loader.bind(ctx)('body{  background-color: %data.color%;  }');
    });

});
