app.factory('audio', ['$document', function($document) {
	var audio = $document[0].createElement('audio');
	return audio;
}]);