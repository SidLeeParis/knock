/***** TEMPLATING *****/
var Templating = (function($, _, window, document){
	var activeModule = getActiveModule(window.location.hash.split('#')[1]),
		isChanging	 = false,
		requestId;

	function getActiveModule(hash){
		var active = !_.has(Modules, hash) ? 'sidlee' : hash;

		if (!hash && Tracking.isTracking) {
			var modules = _.keys(Modules),
				index 	= _.indexOf(modules, activeModule.name);

			index = (index + 1 === modules.length) ? 0 : index + 1;

			active = modules[index];
		}

		return {
			name: active,
			reference: null
		};
	}

	function loadTemplate(hash){
		stopAnimations();
		isChanging 	 = true;
		activeModule = getActiveModule(hash);

		Elements.$content.load('templates/'+ activeModule.name +'.html', function(){
			isChanging = false;

			activeModule.reference = new Modules[activeModule.name]();
			_gaq.push(['_trackEvent', 'module', 'selected', activeModule.name]);
			// document.title 		   = 'Knock - ' + activeModule.reference.title;
		});

		window.location.hash = '#' + activeModule.name;
	}

	function stopAnimations(){
		if (requestId){
			window.cancelAnimFrame(requestId);
			requestId = undefined;
		}
	}

	loadTemplate(activeModule.name);

	return {
		loadTemplate: loadTemplate,
		stopAnimations: stopAnimations,
		get activeModule(){return activeModule;},
		get requestId(){return requestId;},
		set requestId(value){requestId = value;},
		get isChanging(){return isChanging;}
	};
})(jQuery, _, window, document);
