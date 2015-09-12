Modules.watercup = function(){
	var title 	   = 'Jurassic Watercup',
		$video1    = $('#water'),
		$video2    = $('#ripple'),
		$video3    = $('#trex'),
		_count     = 0,
		_isPlaying = false;

	function feedback(){
		if (!_isPlaying){
			_isPlaying = true;
		    $video1.hide();

		    if (_count < 3){
			    $video2.show();
			    $video2[0].play();

			    $video2[0].onended = function(){
			    	$video2.hide();
			    	$video1[0].currentTime = 0;
			    	$video1.show();
			    	_isPlaying = false;
			    };

			    _count++;
		    }

		    else {
		    	$video3.show();
		    	$video3[0].play();
		    	$video3[0].onended = function(){
		    		$video1[0].currentTime = 0;
		    		$video1.fadeIn();
		    		$video3.fadeOut();

		    		_isPlaying = false;
		    		_count 	  = 0;
		    	};
		    }
		}
	}

	return {
		feedback: feedback,
		title: title
	};
};