app.controller('PlayerController', ['$scope', '$http', function($scope, $http) {
	var audio = document.createElement('audio');
	$scope.audio = audio;
	
	// audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/07/20130726_sf_05.mp4?orgId=1&topicId=1032&ft=3&f=61';
	// audio.play();
	
	$scope.play = function(program) {
		if ($scope.playing) $scope.audio.pause();
		var url = program.audio[0].format.mp4.$text;
		audio.src = url;
		audio.play();
		// Store the state of the player as playing
		$scope.playing = true;
	}
	
	$http({
		method: 'JSONP',
		url: nprURL + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
	}).success(function(data, status) {
		// Now we have a list of the stories (data.list.story)
		// in the data object that the NPR API 
		// returns in JSON that looks like:
		// data: { "list": {
		//   		"title": ...
		//   		"story": [
		//     			{ "id": ...
		//       		"title": ...
		// Store the list of stories on the scope
		// from the NPR API response object (described above)
		$scope.programs = data.list.story;
	}).error(function(data, status) {
		// Some error occurred
	});
}]);