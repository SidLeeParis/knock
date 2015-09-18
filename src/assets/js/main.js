/********* Polyfills requestAnimationFrame / cancelAnimationFrame *********/
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback){window.setTimeout(callback, 1000 / 60);};
})();

window.cancelAnimFrame = (function(){
	return window.cancelAnimationFrame 	  	 ||
		   window.webkitCancelAnimationFrame ||
		   window.mozCancelAnimationFrame 	 ||
		   window.oCancelAnimationFrame		 ||
		   window.msCancelAnimationFrame 	 ||
		   window.clearTimeout;
})();

/***** ELEMENTS & EVENTS *****/
var Elements = (function($, Modernizr, window){
	var $window		= $(window),
		$container  = $('.container'),
		$content 	= $container.find('.content'),
		$btnConfirm = $container.find('.btn-confirm'),
		$overlays 	= $container.find('.overlay');

	$window.on('popstate', function(){
		if (!Templating.isChanging){
			Templating.loadTemplate(window.location.hash.split('#')[1]);
		}
	});

	$window.on('keyup', function(event){
		if (event.keyCode === 32){
			Tracking.isTracking ? Templating.loadTemplate() : $btnConfirm.trigger('click');
			return false;
		}

		if (event.keyCode === 27){
			Tracking.isTracking ? $overlays.fadeOut() : $btnConfirm.trigger('click');
		}
	});

	$container.find('.space-indicator .wrapper').on('click', function(){
		Templating.loadTemplate();
	});

	$btnConfirm.on('click', function(){
		Tracking.startTracking();
		$overlays.fadeOut();
	});

	$container.find('.btn-overlay').on('click', function(){
		$overlays.filter('[data-overlay="'+ $(this).data('overlay') +'"]').fadeIn();
	});

	$overlays.filter('[data-overlay!="landing"]').on('click', function() {
		$(this).fadeOut();
	});

	$overlays.find('.btn-close').on('click', function(){
		$(this).parents('.overlay').fadeOut();
	});

	if (Modernizr.touchevents) {
		$overlays.hide();
		$overlays.filter('[data-overlay="already-has-touch"]').show();
	}
	else if (!Modernizr.getusermedia){
		$overlays.hide();
		$overlays.filter('[data-overlay="no-getusermedia"]').show();
	}

	$('body').flowtype({
		minFont: 11,
		maxFont: 28,
		fontRatio: 76
	});

	return {
		$window: $window,
		$content: $content
	};
})(jQuery, Modernizr, window);

/***** MODULES *****/
var Modules = {};
