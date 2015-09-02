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
	var windowElem	= $(window),
		container 	= $('.container'),
		content 	= container.find('.content'),
		menu 	    = $('.menu'),
		modulesList = menu.find('.modules li'),
		menuButton  = menu.find('.toggle-button');

	windowElem.on('popstate', function(){
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

	menuButton.on('click', function(){
		menu.clearQueue();
		menuButton.toggleClass('opened');
		menu.toggleClass('closed open');
		container.toggleClass('pushed');

		return false;
	});

	$('.btn-confirm').on('click', function(){
		Templating.loadTemplate(Templating.activeModule.name);
	});

	return {
		windowElem: windowElem,
		content: content,
		modulesList: modulesList
	};
})(jQuery, window);

/***** MODULES *****/
var Modules = {};