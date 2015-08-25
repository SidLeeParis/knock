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
var Elements = (function($, window){
	var container 	= $('.container'),
		content 	= container.find('.content'),
		menu 	    = $('.menu'),
		modulesList = menu.find('.modules li'),
		presetsList = menu.find('.presets li'),
		menuButton  = menu.find('.toggle-button');


	$(window).on('popstate', function(){
		if (!Templating.isChanging){
			Templating.loadTemplate(window.location.hash.split('#')[1]);
		}
	});

	$('.modules .module-switch').on('click', function(event){
		event.stopPropagation();

		Templating.loadTemplate($(this).attr('href').split('#')[1]);
	});

	modulesList.on('click', function(){
		$(this).find('a').trigger('click');
	});

	presetsList.on('click', function(){
		Templating.activePreset = $(this).data('preset');
		Templating.loadPreset(Templating.activePreset);
	});

	menuButton.on('click', function(){
		menu.clearQueue();
		menuButton.toggleClass('opened');
		menu.toggleClass('closed open');
		container.toggleClass('pushed');

		return false;
	});

	$(window).unload(function(){
		localStorage.setItem('preset', Templating.activePreset);
	});

	$('.btn-confirm').on('click', function(){
		Templating.loadTemplate(Templating.activeModule.name);
	});

	return {
		content: content,
		modulesList: modulesList,
		presetsList: presetsList
	};
})(jQuery, window);

/***** MODULES *****/
var Modules = {};