Modules.graph = function(){
	var title  	  = 'Intensity Graph',
		_canvas   = document.getElementById('chart-canvas'),
		_smoothie = new SmoothieChart({
			grid: {strokeStyle: 'transparent', verticalSections: 0, borderVisible: false, fillStyle: 'transparent'},
			labels: {disabled: true},
			millisPerPixel: 5,
			maxValue: 10,
			minValue: -8
		}),
		_intensityLine = new TimeSeries();

	var resize = function(){
		_canvas.width  = Elements.$content.width();
		_canvas.height = Elements.$content.height();

		Templating.stopAnimations();
		loop();
	};

	function feedback(intensity){
		return;
	}

	function loop(){
		var intensity = Math.abs(_.last(Tracking.tracker.bounceIntensities)) || 0;

		_intensityLine.append(new Date().getTime(), intensity);
		Templating.requestId = window.requestAnimFrame(loop);
	}

	_smoothie.addTimeSeries(_intensityLine, {lineWidth: '4', strokeStyle: '#FFF'});
	_smoothie.streamTo(_canvas, 0);

	resize();

	resize = _.debounce(resize, 200);
	Elements.$window.on('resize', resize);

	return {
		feedback: feedback,
		title: title
	};
};