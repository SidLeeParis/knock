/***** TEMPLATING *****/
var Templating = (function($, _, Modernizr, window, document){
	var activeModule 	= getActiveModule(window.location.hash.split('#')[1]),
		isChanging		= false,
		requestId;

	function getActiveModule(hash){
		var active = hash === '' ? 'sidlee' : hash;

		active = _.has(Modules, active) ? active : 'sidlee';

		return {
			name: active,
			reference: null
		};
	}

	function loadTemplate(hash){
		if (!Tracking.isTracking){
			Tracking.startTracking();
		}

		stopAnimations();
		isChanging = true;

		activeModule = getActiveModule(hash);

		Elements.content.load('templates/'+ activeModule.name +'.html', function(){
			isChanging = false;

			activeModule.reference = new Modules[activeModule.name]();
			document.title 		   = 'Knock - ' + activeModule.reference.title;
		});

		Elements.modulesList.filter('.active').toggleClass('active');
		Elements.modulesList.find('a').filter('[href="#'+ activeModule.name +'"]').parent().addClass('active');

		window.location.hash = '#' + activeModule.name;
	}

	function stopAnimations(){
		if (requestId){
			window.cancelAnimFrame(requestId);
			requestId = undefined;
		}
	}

	if (!Modernizr.getusermedia){
		Elements.content.html('<div class="center"><p>It looks like your browser cannot capture your camera\'s video, which is required for the experiment to work.<p><p>We recommend the latest versions of Google Chrome or Firefox.</p></div>');
	}

	return {
		loadTemplate: loadTemplate,
		get activeModule(){return activeModule;},
		get requestId(){return requestId;},
		set requestId(value){requestId = value;},
		get isChanging(){return isChanging;}
	};
})(jQuery, _, Modernizr, window, document);