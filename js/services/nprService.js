app.factory('nprService', function($http) {
	var doRequest = function(apiKey) {
		return $http({
			method: 'JSONP',
			url: nprURL + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
		});
	}

	return {
		programs: function(apiKey) { return doRequest(apiKey); }
	};
});