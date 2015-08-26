/***** TRACKING *****/
var Tracking = (function(_, tracking, document){
	var trackingCanvas  = document.getElementById('tracking-canvas'),
		trackingContext = trackingCanvas.getContext('2d'),
		isTracking 		= false,
		FastTracker 	= function(){
			FastTracker.base(this, 'constructor');

			this.corners   	 		   = [];   // Feature points
			this.descriptors 		   = [];   // Feature points descriptors, used for the match
			this.translationIntensity  = 0;    // Intensity (height) of the image translation
			this.blur 	   			   = 4;    // Blur level
			this.uncertainty		   = 3;    // Uncertainty level in pixels to validate the movement of a feature point
			this.translationThreshold  = 1;    // Height in pixel that is necessary to detect that a movement was a translation
			this.translationPercentage = 0.98; // Percentage of the feature points that have to have moved of the same height to detect an image translation
			
			this.bouncing		   		   = false;	// Bool that tells us if the image is bouncing
			this.bounceIntensities 		   = [];	// Saved bouncing intensities of the last image translation
			this.lastBouncesLength 		   = 0;		// The size of bounceIntensities is saved to know if new bounces have occured
			this.startTracking	   		   = false;	// Bool that tells us if we can track a new image translation
			this.startTrackingIndex 	   = 0;		// We save at which point we can search for new knocks in bounceIntensities
			this.increasingBounceThreshold = 3; 	// Number of these bounces that have to be superior to the bounce-1 so that we can tell if a new knock occured
			this.interval 				   = null;	// setInterval initialisation
		};

	tracking.inherits(FastTracker, tracking.Tracker);

	FastTracker.prototype.isTranslation = function(matches){
		if (matches.length > 1){ // If there's at least 1 match
			var reliableKeypoint  = _.max(matches, function(match){return match.confidence;}),
				translationHeight = reliableKeypoint.keypoint2[1] - reliableKeypoint.keypoint1[1]; // Height of the movement of the feature point with the highest confidence

			this.translationIntensity = translationHeight; // We save the intensity of the movemnt
			translationHeight 		  = Math.abs(translationHeight);

			if (translationHeight >= this.translationThreshold) { // If the intensity is superior or egal to the threshold
				/* 
				If more than this.translationPercentage percent of the feature points moved of the same height (while taking into account this.uncertainty),
				then an image translation occured and it wasn't just a movement.
				*/
				return _.filter(matches, function(match){
					var difference = Math.abs(match.keypoint2[1] - match.keypoint1[1]);

					if (difference > 0 && difference - this.uncertainty <= translationHeight && difference + this.uncertainty >= translationHeight){
						return true;
					}
				}, this).length >= Math.floor(this.translationPercentage * matches.length);
			}
		}

		return false;
	};

	FastTracker.prototype.knock = function(){ // Feedback
		var intensity = Math.abs(_.last(tracker.bounceIntensities)) || 1;

		Templating.activeModule.reference.feedback(intensity);
	};

	FastTracker.prototype.checkNewBounce = function(){
		// If since the last execution of that function (300ms), no new bounces occured
		if (this.bounceIntensities.length == this.lastBouncesLength){
			console.log('                             reset');
			// We can reset all the values and wait for a new image translation
			this.resetValues();
			this.bouncing 		   = false;
			this.bounceIntensities = [];
		}

		else { // Else, we update the number of bounces
			this.lastBouncesLength = this.bounceIntensities.length;
		}
	};

	FastTracker.prototype.resetValues = function(){
		clearInterval(this.interval);
		this.startTracking 		= false;
		this.startTrackingIndex = 0;
		this.lastBouncesLength 	= 0;
	};

	FastTracker.prototype.initiateTimeout = function(that, timer){ // Feedback timer
		setTimeout(function(){
				that.knock(); // Feedback (that should take the highest intensity level that occured 100ms after the knock)

				setTimeout(function(){ // 50ms later, we initialise the variables used to detect if a new knock occured or if the movement are oscillations of the last one
					that.startTracking 		= true;
					that.startTrackingIndex = that.bounceIntensities.length - 1;
				}, 50);

				that.interval = setInterval(function(){that.checkNewBounce();}, 300); // We launch the interval used to know if the bounces stopped.
		}, timer);
	};

	FastTracker.prototype.track = function(pixels, width, height){
		var blur 		   = tracking.Image.blur(pixels, width, height, this.blur),
	    	gray 		   = tracking.Image.grayscale(blur, width, height),
			corners 	   = tracking.Fast.findCorners(gray, width, height),
			descriptors    = tracking.Brief.getDescriptors(gray, width, corners),
			matchedCorners = tracking.Brief.reciprocalMatch(this.corners, this.descriptors, corners, descriptors);

		// Filtering the matches with a confidence < .75 or with a value of -Infinity/Infinity (?)
		matchedCorners = _.filter(matchedCorners, function(match){return match.confidence >= 0.75 && match.confidence !== Math.abs(Infinity);}); 

		if (this.isTranslation(matchedCorners)){ // If a translation happened on this image frame
			if (!this.bouncing){ // If that translation isn't just a bounce of another knock
				this.bouncing = true;
				this.initiateTimeout(this, 100); // We launch the feedback timer
			}

			else {
				var bounceIntensities = this.bounceIntensities,
					positiveBounces   = _.filter(bounceIntensities.slice(this.startTrackingIndex), function(bounce){return bounce > 0;}), // We only take the bounces with a positive intensity after we started tracking for a new knock
					lastBounces 	  = _.last(positiveBounces, this.increasingBounceThreshold); // We test on this.increasingBounceThreshold values of bounceIntensities

				bounceIntensities.push(this.translationIntensity); // We add the new bounce to the bounceIntensities array

				if (this.startTracking && lastBounces.length && _.every(lastBounces, function(bounce){return bounce > positiveBounces[positiveBounces.length - this.increasingBounceThreshold - 1];}, this)){
					/* If the this.increasingBounceThreshold last values were higher than their bounce-1, 
					   it was a new knock and not only the oscillation because of the last bounce.
					*/
					this.resetValues(); // We reset all values used for the tests
					this.bounceIntensities = [_.last(bounceIntensities)]; // The last value of the actual bounceIntensities array becomes the first of the new array, and the old values are deleted
					this.initiateTimeout(this, 50); // We launch the feedback timer again
				}
			}
		}

		// The corners and descriptors of the new frame are saved for the next frame testing
		this.corners 	 = corners;
		this.descriptors = descriptors;

		this.emit('track', {data: corners});
	};

	var tracker = new FastTracker();

	tracker.on('track', function(event){
		var corners = event.data;

		trackingContext.clearRect(0, 0, trackingCanvas.width, trackingCanvas.height);
		trackingContext.fillStyle = '#F00';

		for (var i = 0; i < corners.length; i += 2){
			trackingContext.fillRect(corners[i], corners[i+1], 2, 2);
		}
	});

	function startTracking(){
		tracking.track('#tracking-video', tracker, {camera: true});
		isTracking = true;
	}

	return {
		get isTracking(){return isTracking;},
		tracker: tracker,
		tracking: tracking,
		startTracking: startTracking
	};
})(_, tracking, document);