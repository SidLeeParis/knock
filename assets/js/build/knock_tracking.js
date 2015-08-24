/***** TRACKING *****/
var Tracking = (function(_, tracking, document){
	var trackingCanvas  = document.getElementById('tracking-canvas'),
		trackingContext = trackingCanvas.getContext('2d'),
		isTracking 		= false,
		FastTracker 	= function(){
			FastTracker.base(this, 'constructor');

			this.corners   	 		   = [];   // Point d'intérêts
			this.descriptors 		   = [];   // Descripteurs de ces points d'intérêts, utilisés pour faire le match
			this.translationIntensity  = 0;    // Enregistrement de l'intensité (la hauteur) de translation de l'image
			this.blur 	   			   = 4;    // Taux de flou à appliquer sur l'image (suppression des points d'intérêts peu précis)
			this.uncertainty		   = 3;    // Hauteur d'incertitude en pixels pour valider le déplacement d'un point
			this.translationThreshold  = 1;    // Hauteur en pixel nécessaire pour détecter qu'un mouvement est une translation
			this.translationPercentage = 0.98; // Pourcentages des points d'intérêts qui doivent avoir bougé de la même hauteur pour que ce soit une translation d'image
			
			this.bouncing		   		   = false;	// Booléen pour savoir si l'image est en train d'osciller
			this.bounceIntensities 		   = [];	// Tableau qui enregistre les intensités de bounce à chaque translation d'image
			this.lastBouncesLength 		   = 0;		// Enregistrement de la taille du tableau bounceIntensities
			this.startTracking	   		   = false;	// Booléen pour savoir si on est prêt tracker une nouvelle translation d'image
			this.startTrackingIndex 	   = 0;		// On enregistre à partir de quel index on peut rechercher ces nouveaux knock dans this.bounceIntensities
			this.increasingBounceThreshold = 3; 	// Nombre de rebonds devant être supérieurs au précédent pour décider qu'un nouveau knock a eu lieu
			this.interval 				   = null;	// Initialisation pour setInterval
		};

	tracking.inherits(FastTracker, tracking.Tracker);

	FastTracker.prototype.isTranslation = function(matches){
		if (matches.length > 1){ // Si il y a plus d'un match
			var reliableKeypoint  = _.max(matches, function(match){return match.confidence;}),
				translationHeight = reliableKeypoint.keypoint2[1] - reliableKeypoint.keypoint1[1]; // Hauteur de la translation du keypoint avec la meilleure confidence

			this.translationIntensity = translationHeight; // On enregistre l'intensité de la translation d'image
			translationHeight 		  = Math.abs(translationHeight);

			if (translationHeight >= this.translationThreshold) { // Si l'intensité de la translation est supérieure ou égale à notre seuil de translation (1px)
				/* 
				Si plus de this.translationPercentage pourcent des points d'intérêts ont bougé de la même hauteur (en tenant compte de this.uncertainty)
				c'est qu'il y a bien eu translation d'image 
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
		Templating.activeModule.reference.feedback();
	};

	FastTracker.prototype.checkNewBounce = function(){
		// Si depuis la dernière exécution de la fonction (intervalle de 300ms), aucun nouveau rebond n'a eu lieu
		if (this.bounceIntensities.length == this.lastBouncesLength){
			console.log('                             reset');
			// On reset les valeurs et on attends la prochaine translation d'image
			this.resetValues();
			this.bouncing 		   = false;
			this.bounceIntensities = [];
		}

		else { // Sinon, on mets à jour le nombre de rebonds
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
		/*	if (that.bounceIntensities.length){ // Si on a eu des rebonds après avoir lancé le timeout*/
				console.log('Knock Knock, intensity ' + Math.abs(_.max(that.bounceIntensities))); // On enregistre l'intensité en prenant le rebond le plus important
				that.knock(); // On lance le feedback

				setTimeout(function(){ // 50ms plus tard, on initialise des variables utilisées pour détecter si un nouveau rebond a eu lieu
					that.startTracking 		= true;
					that.startTrackingIndex = that.bounceIntensities.length - 1;
				}, 50);

				that.interval = setInterval(function(){that.checkNewBounce();}, 300); // On lance l'interval pour savoir si les rebonds se sont arrêtés
		/*	}

			else { // Sinon, c'est que les rebonds n'étaient pas assez importants pour être enregistrés
				that.bouncing = false;
			}*/
		}, timer);
	};

	FastTracker.prototype.track = function(pixels, width, height){
		var blur 		   = tracking.Image.blur(pixels, width, height, this.blur),
	    	gray 		   = tracking.Image.grayscale(blur, width, height),
			corners 	   = tracking.Fast.findCorners(gray, width, height),
			descriptors    = tracking.Brief.getDescriptors(gray, width, corners),
			matchedCorners = tracking.Brief.reciprocalMatch(this.corners, this.descriptors, corners, descriptors);

		// Filtrage des matchs avec une confidence inférieure à 0.75 ou avec une valeur de -Infinity/Infinity (?)
		matchedCorners = _.filter(matchedCorners, function(match){return match.confidence >= 0.75 && match.confidence !== Math.abs(Infinity);}); 

		if (this.isTranslation(matchedCorners)){ // Si il y a eu une translation sur cette frame
			if (!this.bouncing){ // Si cette translation n'est pas un des rebonds d'un autre knock
				this.bouncing = true;
				this.initiateTimeout(this, 100); // On lance le timer de feedback
			}

			else {
				var bounceIntensities = this.bounceIntensities,
					positiveBounces   = _.filter(bounceIntensities.slice(this.startTrackingIndex), function(bounce){return bounce > 0;}), // On ne prends que les bonds d'intensité positive après le début du track
					lastBounces 	  = _.last(positiveBounces, this.increasingBounceThreshold); // On prends les this.increasingBounceThreshold dernière valeures de bounceIntensities

				bounceIntensities.push(this.translationIntensity); // On ajoute le nouveau rebond au tableau bounceIntensities

				if (this.startTracking && lastBounces.length && _.every(lastBounces, function(bounce){return bounce > positiveBounces[positiveBounces.length - this.increasingBounceThreshold - 1];}, this)){
					/* Si tous les this.increasingBounceThreshold derniers rebonds sont d'une intensité supérieure à l'index this.increasingBounceThreshold
					C'est que c'est un nouveau knock */
					this.resetValues(); // On reset les valeurs
					this.bounceIntensities = [_.last(bounceIntensities)]; // La dernière valeur du tableau actuel devient la première et le reste des valeurs sont supprimées
					this.initiateTimeout(this, 50); // On relance le timer de feedback
				}
			}
		}

		// Les corners et descriptors de la nouvelle frame sont enregistrés et remplacent donc les valeurs de l'ancienne frame
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