var runner = require('./runner');

exports.run_http_get = function(req, res) {
    runner.run_http_get('http://stcsrv-c103.fareast.corp.microsoft.com', 'sina', function(result, data) {
        res.jsonp({ 'status': 200, 'message': data });
    });
};
