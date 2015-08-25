Modules.graph = function(){
	var title  = 'Intensity Graph',
		canvas = document.getElementById('chart-canvas'),
		resize = function(){
			canvas.width  = Elements.content.width();
			canvas.height = Elements.content.height();
		}();

	$(window).on('resize', resize);

	var smoothie = new SmoothieChart({
			grid: {strokeStyle: 'transparent', verticalSections: 0, borderVisible: false, fillStyle: 'transparent'},
			labels: {disabled: true},
			millisPerPixel: 5,
			maxValue: 10,
			minValue: -8
		}),
		intensityLine = new TimeSeries();

	function feedback(){
		return;
	}

	function loop(){
		var intensity = Math.abs(_.last(Tracking.tracker.bounceIntensities)) || 0;

		intensityLine.append(new Date().getTime(), intensity);
		Templating.requestId = window.requestAnimFrame(loop);
	}

	smoothie.addTimeSeries(intensityLine, {lineWidth: '4', strokeStyle: '#AAA'});
	smoothie.streamTo(canvas, 0);

	loop();

	return {
		feedback: feedback,
		title: title
	};
};