app.factory('player', ['audio', '$rootScope', function(audio, $rootScope) {
	var player = {
		playing: false,
		progress: 0,
		current: null,
		ready: false,

		play: function(program) {
			// If we are playing, stop the current playback
			if (player.playing) player.stop();
			var url = program.audio[0].format.mp4.$text; // from the npr API
			player.current = program; // Store the current program
			audio.src = url;
			audio.play(); // Start playback of the url
			player.playing = true
		},

		stop: function() {
			if (player.playing) {
				audio.pause(); // stop playback
				// Clear the state of the player
				player.playing = false; 
				player.current = null;
			}
		},

		currentTime: function() {
			return audio.currentTime;
		},

		currentDuration: function() {
			return audio.duration;
		}
	};
	audio.addEventListener('canplay', function(evt) {
		$rootScope.$apply(function() {
			player.ready = true;
		});
	});
	audio.addEventListener('timeupdate', function(evt) {
		$rootScope.$apply(function() {
			player.progress = player.currentTime();
			player.progress_percent = player.progress / player.currentDuration();
		});
	});
	audio.addEventListener('ended', function() {
		$rootScope.$apply(player.stop());
	});
	return player;
}]);