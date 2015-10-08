var loader = require('../');
var should = require('should');

describe('basic test', function() {
    'use strict';

    it('all good', function(done) {
        var options = JSON.stringify({variable: 'data'});
        var value = JSON.stringify({color: '#000'});

        var ctx = {
            query: '?options=' + new Buffer(options).toString('base64') + '&value=' + new Buffer(value).toString('base64'),
            callback: function(err, value) {
                should(value).eql('body{  background-color: #000;  }', 'output incorrect');
                done();
            }
        };
        loader.bind(ctx)('body{  background-color: <%= data.color %>;  }');
    });

    it('without options', function(done) {
        var value = JSON.stringify({color: '#000'});

        var ctx = {
            query: '?value=' + new Buffer(value).toString('base64'),
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
        var options = JSON.stringify({
            variable: 'data',
            interpolate: {
                pattern: '%([\\s\\S]+?)%'
            }
        });
        var value = JSON.stringify({color: '#000'});

        var ctx = {
            query: '?options=' + new Buffer(options).toString('base64') + '&value=' + new Buffer(value).toString('base64'),
            callback: function(err, value) {
                should(value).eql('body{  background-color: #000;  }', 'output incorrect');
                done();
            }
        };
        loader.bind(ctx)('body{  background-color: %data.color%;  }');
    });

});
