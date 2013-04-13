

exports.success = function(data) {
       return {'status':'success', 'value' : data};
};

exports.failure = function(err) {
       return {'status':'error', 'error' : err};
};

