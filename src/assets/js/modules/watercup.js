Modules.watercup = function(){
	var title 	  = 'Jurassic Watercup',
		video1    = $('#water'),
		video2    = $('#ripple'),
		video3    = $('#trex'),
		count     = 0,
		isPlaying = false;

	function feedback(){
		if (!isPlaying){
			isPlaying = true;
		    video1.hide();

		    if (count < 3){
			    video2.show();
			    video2[0].play();

			    video2[0].onended = function(){
			    	video2.hide();
			    	video1[0].currentTime = 0;
			    	video1.show();
			    	isPlaying = false;
			    };

			    count++;
		    }

		    else {
		    	video3.show();
		    	video3[0].play();
		    	video3[0].onended = function(){
		    		video1[0].currentTime = 0;
		    		video1.fadeIn();
		    		video3.fadeOut();

		    		isPlaying = false;
		    		count 	  = 0;
		    	};
		    }
		}
	}

	return {
		feedback: feedback,
		title: title
	};
};