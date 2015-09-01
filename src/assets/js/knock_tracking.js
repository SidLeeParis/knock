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
			this.blur 	   			   = 3;    // Blur level
			this.uncertainty		   = 3;    // Uncertainty level in pixels to validate the movement of a feature point
			this.translationPercentage = 0.95; // Percentage of the feature points that have to have moved of the same height to detect an image translation
			
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
		if (matches.length > 0){ // If there's at least 1 match
			var reliableKeypoint  = _.max(matches, function(match){return match.confidence;}), // We filter the best reliable keypoint thanks to its confidence
				translationHeight = reliableKeypoint.keypoint2[1] - reliableKeypoint.keypoint1[1]; // Height of the movement of the feature point with the highest confidence

			this.translationIntensity = translationHeight; // We save the height of the movement
			translationHeight 		  = Math.abs(translationHeight); // Tests are made on the absolute value of this height

			if (translationHeight >= 1) { // If the height of the translation is superior to 1
				/* 
					If more than this.translationPercentage percent of the feature points moved of the same height (while taking into account this.uncertainty),
					then an image translation occured and it wasn't just a movement.
				*/
				var translatedMatches = _.filter(matches, function(match){
					var difference = Math.abs(match.keypoint2[1] - match.keypoint1[1]);

					if (difference > 0 && difference - this.uncertainty <= translationHeight && difference + this.uncertainty >= translationHeight){
						return true;
					}
				}, this);

				return translatedMatches.length >= Math.ceil(0.5 * matches.length);
			}
		}

		return false;
	};

	FastTracker.prototype.knock = function(){ // Feedback
		var intensity = Math.abs(_.max(this.bounceIntensities, function(bounce){return Math.abs(bounce);}));

		Templating.activeModule.reference.feedback(intensity);
	};

	FastTracker.prototype.initiateTimeout = function(timer){ // Feedback timer
		var that = this;

		setTimeout(function(){
				that.knock(); // Feedback (that should take the highest intensity level that occured 100ms after the knock)

				setTimeout(function(){ // 50ms later, we initialise the variables used to detect if a new knock occured or if the movement are oscillations of the last one
					that.startTracking 		= true;
					that.startTrackingIndex = that.bounceIntensities.length - 1;
				}, 50);

				that.interval = setInterval(function(){that.checkNewBounces();}, 300); // We launch the interval used to know if the bounces stopped.
		}, timer);
	};

	FastTracker.prototype.checkNewBounces = function(){ // We can detect a new knock even if there are still oscillations from the last one
		// If since the last execution of that function (300ms), no new bounces occured
		if (this.bounceIntensities.length == this.lastBouncesLength){
			// We can reset all of the values and wait for a new image translation
			this.resetValues();
			this.bouncing 		   = false;
			this.bounceIntensities = [];
		}

		else { // Else, we update the number of bounces
			this.lastBouncesLength = this.bounceIntensities.length;
		}
	};

	FastTracker.prototype.checkNewKnock = function(){
		var bounceIntensities = this.bounceIntensities,
			positiveBounces   = _.filter(bounceIntensities.slice(this.startTrackingIndex), function(bounce){return bounce > 0;}), // We only take the bounces with a positive intensity after we started tracking for a new knock
			lastBounces 	  = _.last(positiveBounces, this.increasingBounceThreshold); // We test on this.increasingBounceThreshold values of bounceIntensities

		bounceIntensities.push(this.translationIntensity); // We add the new bounce to the bounceIntensities array

		if (this.startTracking && lastBounces.length && _.every(lastBounces, function(bounce){return bounce > positiveBounces[positiveBounces.length - this.increasingBounceThreshold - 1];}, this)){
			/* If the this.increasingBounceThreshold last values were higher than their bounce-1, 
			   it was a new knock and not only the oscillation because of the last bounce. */
			this.resetValues(); // We reset all values used for the tests
			this.bounceIntensities = [_.last(bounceIntensities)]; // The last value of the actual bounceIntensities array becomes the first of the new array, and the old values are deleted
			this.initiateTimeout(this, 50); // We launch the feedback timer again
		}
	};

	FastTracker.prototype.resetValues = function(){ // Reset testing values after a new knock is detected
		clearInterval(this.interval);
		this.startTracking 		= false;
		this.startTrackingIndex = 0;
		this.lastBouncesLength 	= 0;
	};

	FastTracker.prototype.adjustSettings = function(matchedCorners){ // Settings are adjusted on the fly for best performance/precision
		if (matchedCorners.length > 20){
			tracking.Fast.THRESHOLD += 1;
		}

		else if (matchedCorners.length < 10 && tracking.Fast.THRESHOLD > 20){
			tracking.Fast.THRESHOLD -= 1;
		}
	};

	FastTracker.prototype.track = function(pixels, width, height){
		var blur 		   = tracking.Image.blur(pixels, width, height, this.blur),
	    	gray 		   = tracking.Image.grayscale(blur, width, height),
			corners 	   = tracking.Fast.findCorners(gray, width, height),
			descriptors    = tracking.Brief.getDescriptors(gray, width, corners),
			matchedCorners = tracking.Brief.reciprocalMatch(this.corners, this.descriptors, corners, descriptors);
		
		// Filtering the matches with a confidence < .85 or with a value of -Infinity/Infinity (?)
		matchedCorners = _.filter(matchedCorners, function(match){return match.confidence >= 0.85 && match.confidence !== Math.abs(Infinity);}); 
		this.adjustSettings(matchedCorners); // Every frame tracked, we adjust the settings (performance / precision gain)

		this.emit('track', {
			corners: corners,
			matchedCorners: matchedCorners
		});

		// The corners and descriptors of the new frame are saved for the next frame that will be tested
		this.corners 	 = corners;
		this.descriptors = descriptors;
	};

	var tracker = new FastTracker();

	tracker.on('track', function(event){
		var matchedCorners = event.matchedCorners;

		if (this.isTranslation(matchedCorners)){ // If a translation occured on this image frame
			if (!this.bouncing){ // If that translation isn't just a bounce of another knock
				this.bouncing = true;
				this.bounceIntensities.push(this.translationIntensity); // We add the new bounce to the bounceIntensities array
				this.initiateTimeout(80); // We launch the feedback timer
			}

			else {
				this.checkNewKnock();
			}
		}

		var corners = event.corners;

		trackingContext.clearRect(0, 0, trackingCanvas.width, trackingCanvas.height);
		trackingContext.fillStyle = '#F00';

		for (var i = 0; i < corners.length; i += 2){
			trackingContext.fillRect(corners[i], corners[i+1], 2, 2);
		}
	});

	function startTracking(){
		tracking.track('#tracking-video', tracker, {camera: true});
		isTracking = true;

		tracking.Fast.THRESHOLD = 20;

		if (getScreenSize() > 19){
			tracker.translationPercentage = 0.7;
		}
	}

	function getScreenSize(){
		var dpi  = document.getElementById('dpi'),
			x 	 = Math.pow((screen.width / dpi.offsetWidth), 2),
			y 	 = Math.pow((screen.height / dpi.offsetHeight), 2);

		return Math.sqrt(x+y);
	}

	return {
		startTracking: startTracking,
		get isTracking(){return isTracking;},
		tracker: tracker
	};
})(_, tracking, document);