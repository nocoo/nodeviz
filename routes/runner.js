var http = require('http');

exports.run_http_get = function (url, test, callback) {
    if (!callback) return;

    var ts_start = (new Date()).getTime();
    var ts_end = (new Date()).getTime();
    var timeout, done = false;
    var finish = function(result, data) {
        if (!done) { done = true; } else { return; }
        if (callback) { callback(result, data); }
        if (timeout) { clearTimeout(timeout); }
    };

    timeout = setTimeout(function() {
        console.log('timeout');
        ts_end = (new Date()).getTime();
        finish(false, { 'result': 'timeout', 'delay': ts_end - ts_start });
    }, 5000);

    http.get(url, function(res) {
        var body = '', ts_data = 0;
        res.on('data', function(chunk) {
            if (!ts_data) ts_data = (new Date()).getTime();
            body += chunk;
        }).on('end', function() {
            ts_end = (new Date()).getTime();
            var test_result = false;
            if (test) {
                test_result = (body.indexOf(test) != -1);
            }

            finish(true, { 'result': 'ok', 'delay': ts_end - ts_start, 'begin': ts_data - ts_start, 'test': test_result });
        });
    }).on('error', function(error) {
        ts_end = (new Date()).getTime();
        finish(false, { 'result': 'error', 'data': error, 'delay': ts_end - ts_start });
    });
};
