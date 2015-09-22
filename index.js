var _ = require('lodash');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
    'use strict';

    this.cacheable && this.cacheable();
    var querys = loaderUtils.parseQuery(this.query);
    var settings, value;
    try {
        if (querys.options) {
            settings = querys.options;
            if (settings.interpolate) {
                var pattern = settings.interpolate.pattern;
                var attributes = settings.interpolate.attributes;
                settings.interpolate = new RegExp(pattern, attributes);
            }
        }
        if (querys.value) {
            value = querys.value;
        }
        var res = _.template(source, settings)(value);
        this.callback(undefined, res);
    } catch (e) {
        this.callback(e);
        return;
    }
};
