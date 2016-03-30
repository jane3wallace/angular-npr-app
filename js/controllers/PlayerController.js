app.controller('PlayerController', ['$scope', '$http', function($scope, $http) {
	var audio = document.createElement('audio');
	$scope.audio = audio;
	// audio.playing = false;
	audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/07/20130726_sf_05.mp4?orgId=1&topicId=1032&ft=3&f=61';
	audio.play();
	// audio.play = function() {
	// 	audio.play();
	// 	audio.playing = true;
	// };
	// audio.stop = function() {
	// 	audio.pause();
	// 	audio.playing = false;
	// };
	// audio.addEventListener('ended', function() {
	// 	$scope.$apply(function() {
	// 		audio.stop()
	// 	});
	// });
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