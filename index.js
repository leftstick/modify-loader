var _ = require('lodash');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var querys = loaderUtils.parseQuery(this.query);
    var settings, value;
    try {
        if (querys.options) {
            settings = JSON.parse(new Buffer(querys.options, 'base64').toString());
            if (settings.escape) {
                settings.escape = new RegExp(settings.escape.pattern, settings.escape.attributes);
            }
            if (settings.evaluate) {
                settings.evaluate = new RegExp(settings.evaluate.pattern, settings.evaluate.attributes);
            }
            if (settings.interpolate) {
                settings.interpolate = new RegExp(settings.interpolate.pattern, settings.interpolate.attributes);
            }
        }
        if (querys.value) {
            value = JSON.parse(new Buffer(querys.value, 'base64').toString());
        }
        var res = _.template(source, settings)(value);
        this.callback(undefined, res);
    } catch (e) {
        this.callback(e);
        return;
    }
};
