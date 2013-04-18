

exports.success = function(data) {
       return {'status':'success', 'value' : data};
};

exports.failure = function(err) {
       return {'status':'error', 'error' : err};
};

exports.buildPersonResp  = function (obj){
	return  {
		_id : obj.id,
		email : obj.email,
		name : obj.name
	};
}