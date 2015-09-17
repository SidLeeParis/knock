Modules.sidlee = function(){
	var title			    = 'SID LEE Particles',
		_canvas 		    = document.getElementById('particles-canvas'),
		_context    	    = _canvas.getContext('2d'),
		_particles  	 	= [],
		_randomParticles    = [],
		_totalIterations = 40,
		_currentIteration = 0,
		_randomParticlesNum = 200,
		TWO_PI = Math.PI * 2,
		_positions  	 	= _.shuffle([{'x':4,'y':0},{'x':5,'y':0},{'x':6,'y':0},{'x':7,'y':0},{'x':8,'y':0},{'x':9,'y':0},{'x':10,'y':0},{'x':11,'y':0},{'x':16,'y':0},{'x':17,'y':0},{'x':18,'y':0},{'x':19,'y':0},{'x':20,'y':0},{'x':23,'y':0},{'x':24,'y':0},{'x':25,'y':0},{'x':26,'y':0},{'x':27,'y':0},{'x':28,'y':0},{'x':29,'y':0},{'x':30,'y':0},{'x':31,'y':0},{'x':32,'y':0},{'x':41,'y':0},{'x':42,'y':0},{'x':43,'y':0},{'x':44,'y':0},{'x':45,'y':0},{'x':55,'y':0},{'x':56,'y':0},{'x':57,'y':0},{'x':58,'y':0},{'x':59,'y':0},{'x':60,'y':0},{'x':61,'y':0},{'x':62,'y':0},{'x':63,'y':0},{'x':64,'y':0},{'x':65,'y':0},{'x':68,'y':0},{'x':69,'y':0},{'x':70,'y':0},{'x':71,'y':0},{'x':72,'y':0},{'x':73,'y':0},{'x':74,'y':0},{'x':75,'y':0},{'x':76,'y':0},{'x':77,'y':0},{'x':78,'y':0},{'x':3,'y':1},{'x':4,'y':1},{'x':5,'y':1},{'x':6,'y':1},{'x':7,'y':1},{'x':8,'y':1},{'x':9,'y':1},{'x':10,'y':1},{'x':11,'y':1},{'x':12,'y':1},{'x':16,'y':1},{'x':17,'y':1},{'x':18,'y':1},{'x':19,'y':1},{'x':20,'y':1},{'x':23,'y':1},{'x':24,'y':1},{'x':25,'y':1},{'x':26,'y':1},{'x':27,'y':1},{'x':28,'y':1},{'x':29,'y':1},{'x':30,'y':1},{'x':31,'y':1},{'x':32,'y':1},{'x':33,'y':1},{'x':41,'y':1},{'x':42,'y':1},{'x':43,'y':1},{'x':44,'y':1},{'x':45,'y':1},{'x':55,'y':1},{'x':56,'y':1},{'x':57,'y':1},{'x':58,'y':1},{'x':59,'y':1},{'x':60,'y':1},{'x':61,'y':1},{'x':62,'y':1},{'x':63,'y':1},{'x':64,'y':1},{'x':65,'y':1},{'x':68,'y':1},{'x':69,'y':1},{'x':70,'y':1},{'x':71,'y':1},{'x':72,'y':1},{'x':73,'y':1},{'x':74,'y':1},{'x':75,'y':1},{'x':76,'y':1},{'x':77,'y':1},{'x':78,'y':1},{'x':2,'y':2},{'x':3,'y':2},{'x':4,'y':2},{'x':5,'y':2},{'x':6,'y':2},{'x':7,'y':2},{'x':8,'y':2},{'x':9,'y':2},{'x':10,'y':2},{'x':11,'y':2},{'x':12,'y':2},{'x':13,'y':2},{'x':16,'y':2},{'x':17,'y':2},{'x':18,'y':2},{'x':19,'y':2},{'x':20,'y':2},{'x':23,'y':2},{'x':24,'y':2},{'x':25,'y':2},{'x':26,'y':2},{'x':27,'y':2},{'x':28,'y':2},{'x':29,'y':2},{'x':30,'y':2},{'x':31,'y':2},{'x':32,'y':2},{'x':33,'y':2},{'x':34,'y':2},{'x':41,'y':2},{'x':42,'y':2},{'x':43,'y':2},{'x':44,'y':2},{'x':45,'y':2},{'x':55,'y':2},{'x':56,'y':2},{'x':57,'y':2},{'x':58,'y':2},{'x':59,'y':2},{'x':60,'y':2},{'x':61,'y':2},{'x':62,'y':2},{'x':63,'y':2},{'x':64,'y':2},{'x':65,'y':2},{'x':68,'y':2},{'x':69,'y':2},{'x':70,'y':2},{'x':71,'y':2},{'x':72,'y':2},{'x':73,'y':2},{'x':74,'y':2},{'x':75,'y':2},{'x':76,'y':2},{'x':77,'y':2},{'x':78,'y':2},{'x':1,'y':3},{'x':2,'y':3},{'x':3,'y':3},{'x':4,'y':3},{'x':5,'y':3},{'x':6,'y':3},{'x':7,'y':3},{'x':8,'y':3},{'x':9,'y':3},{'x':10,'y':3},{'x':11,'y':3},{'x':12,'y':3},{'x':13,'y':3},{'x':16,'y':3},{'x':17,'y':3},{'x':18,'y':3},{'x':19,'y':3},{'x':20,'y':3},{'x':23,'y':3},{'x':24,'y':3},{'x':25,'y':3},{'x':26,'y':3},{'x':27,'y':3},{'x':28,'y':3},{'x':29,'y':3},{'x':30,'y':3},{'x':31,'y':3},{'x':32,'y':3},{'x':33,'y':3},{'x':34,'y':3},{'x':35,'y':3},{'x':41,'y':3},{'x':42,'y':3},{'x':43,'y':3},{'x':44,'y':3},{'x':45,'y':3},{'x':55,'y':3},{'x':56,'y':3},{'x':57,'y':3},{'x':58,'y':3},{'x':59,'y':3},{'x':60,'y':3},{'x':61,'y':3},{'x':62,'y':3},{'x':63,'y':3},{'x':64,'y':3},{'x':65,'y':3},{'x':68,'y':3},{'x':69,'y':3},{'x':70,'y':3},{'x':71,'y':3},{'x':72,'y':3},{'x':73,'y':3},{'x':74,'y':3},{'x':75,'y':3},{'x':76,'y':3},{'x':77,'y':3},{'x':78,'y':3},{'x':1,'y':4},{'x':2,'y':4},{'x':3,'y':4},{'x':4,'y':4},{'x':5,'y':4},{'x':6,'y':4},{'x':7,'y':4},{'x':10,'y':4},{'x':11,'y':4},{'x':12,'y':4},{'x':13,'y':4},{'x':16,'y':4},{'x':17,'y':4},{'x':18,'y':4},{'x':19,'y':4},{'x':20,'y':4},{'x':23,'y':4},{'x':24,'y':4},{'x':25,'y':4},{'x':26,'y':4},{'x':27,'y':4},{'x':28,'y':4},{'x':29,'y':4},{'x':30,'y':4},{'x':31,'y':4},{'x':32,'y':4},{'x':33,'y':4},{'x':34,'y':4},{'x':35,'y':4},{'x':36,'y':4},{'x':41,'y':4},{'x':42,'y':4},{'x':43,'y':4},{'x':44,'y':4},{'x':45,'y':4},{'x':55,'y':4},{'x':56,'y':4},{'x':57,'y':4},{'x':58,'y':4},{'x':59,'y':4},{'x':68,'y':4},{'x':69,'y':4},{'x':70,'y':4},{'x':71,'y':4},{'x':72,'y':4},{'x':1,'y':5},{'x':2,'y':5},{'x':3,'y':5},{'x':4,'y':5},{'x':5,'y':5},{'x':6,'y':5},{'x':7,'y':5},{'x':16,'y':5},{'x':17,'y':5},{'x':18,'y':5},{'x':19,'y':5},{'x':20,'y':5},{'x':23,'y':5},{'x':24,'y':5},{'x':25,'y':5},{'x':26,'y':5},{'x':27,'y':5},{'x':31,'y':5},{'x':32,'y':5},{'x':33,'y':5},{'x':34,'y':5},{'x':35,'y':5},{'x':36,'y':5},{'x':41,'y':5},{'x':42,'y':5},{'x':43,'y':5},{'x':44,'y':5},{'x':45,'y':5},{'x':55,'y':5},{'x':56,'y':5},{'x':57,'y':5},{'x':58,'y':5},{'x':59,'y':5},{'x':68,'y':5},{'x':69,'y':5},{'x':70,'y':5},{'x':71,'y':5},{'x':72,'y':5},{'x':1,'y':6},{'x':2,'y':6},{'x':3,'y':6},{'x':4,'y':6},{'x':5,'y':6},{'x':6,'y':6},{'x':7,'y':6},{'x':8,'y':6},{'x':9,'y':6},{'x':10,'y':6},{'x':11,'y':6},{'x':16,'y':6},{'x':17,'y':6},{'x':18,'y':6},{'x':19,'y':6},{'x':20,'y':6},{'x':23,'y':6},{'x':24,'y':6},{'x':25,'y':6},{'x':26,'y':6},{'x':27,'y':6},{'x':31,'y':6},{'x':32,'y':6},{'x':33,'y':6},{'x':34,'y':6},{'x':35,'y':6},{'x':36,'y':6},{'x':41,'y':6},{'x':42,'y':6},{'x':43,'y':6},{'x':44,'y':6},{'x':45,'y':6},{'x':55,'y':6},{'x':56,'y':6},{'x':57,'y':6},{'x':58,'y':6},{'x':59,'y':6},{'x':60,'y':6},{'x':61,'y':6},{'x':62,'y':6},{'x':63,'y':6},{'x':64,'y':6},{'x':68,'y':6},{'x':69,'y':6},{'x':70,'y':6},{'x':71,'y':6},{'x':72,'y':6},{'x':73,'y':6},{'x':74,'y':6},{'x':75,'y':6},{'x':76,'y':6},{'x':77,'y':6},{'x':2,'y':7},{'x':3,'y':7},{'x':4,'y':7},{'x':5,'y':7},{'x':6,'y':7},{'x':7,'y':7},{'x':8,'y':7},{'x':9,'y':7},{'x':10,'y':7},{'x':11,'y':7},{'x':12,'y':7},{'x':16,'y':7},{'x':17,'y':7},{'x':18,'y':7},{'x':19,'y':7},{'x':20,'y':7},{'x':23,'y':7},{'x':24,'y':7},{'x':25,'y':7},{'x':26,'y':7},{'x':27,'y':7},{'x':31,'y':7},{'x':32,'y':7},{'x':33,'y':7},{'x':34,'y':7},{'x':35,'y':7},{'x':36,'y':7},{'x':41,'y':7},{'x':42,'y':7},{'x':43,'y':7},{'x':44,'y':7},{'x':45,'y':7},{'x':55,'y':7},{'x':56,'y':7},{'x':57,'y':7},{'x':58,'y':7},{'x':59,'y':7},{'x':60,'y':7},{'x':61,'y':7},{'x':62,'y':7},{'x':63,'y':7},{'x':64,'y':7},{'x':68,'y':7},{'x':69,'y':7},{'x':70,'y':7},{'x':71,'y':7},{'x':72,'y':7},{'x':73,'y':7},{'x':74,'y':7},{'x':75,'y':7},{'x':76,'y':7},{'x':77,'y':7},{'x':4,'y':8},{'x':5,'y':8},{'x':6,'y':8},{'x':7,'y':8},{'x':8,'y':8},{'x':9,'y':8},{'x':10,'y':8},{'x':11,'y':8},{'x':12,'y':8},{'x':13,'y':8},{'x':16,'y':8},{'x':17,'y':8},{'x':18,'y':8},{'x':19,'y':8},{'x':20,'y':8},{'x':23,'y':8},{'x':24,'y':8},{'x':25,'y':8},{'x':26,'y':8},{'x':27,'y':8},{'x':31,'y':8},{'x':32,'y':8},{'x':33,'y':8},{'x':34,'y':8},{'x':35,'y':8},{'x':36,'y':8},{'x':41,'y':8},{'x':42,'y':8},{'x':43,'y':8},{'x':44,'y':8},{'x':45,'y':8},{'x':55,'y':8},{'x':56,'y':8},{'x':57,'y':8},{'x':58,'y':8},{'x':59,'y':8},{'x':60,'y':8},{'x':61,'y':8},{'x':62,'y':8},{'x':63,'y':8},{'x':64,'y':8},{'x':68,'y':8},{'x':69,'y':8},{'x':70,'y':8},{'x':71,'y':8},{'x':72,'y':8},{'x':73,'y':8},{'x':74,'y':8},{'x':75,'y':8},{'x':76,'y':8},{'x':77,'y':8},{'x':7,'y':9},{'x':8,'y':9},{'x':9,'y':9},{'x':10,'y':9},{'x':11,'y':9},{'x':12,'y':9},{'x':13,'y':9},{'x':16,'y':9},{'x':17,'y':9},{'x':18,'y':9},{'x':19,'y':9},{'x':20,'y':9},{'x':23,'y':9},{'x':24,'y':9},{'x':25,'y':9},{'x':26,'y':9},{'x':27,'y':9},{'x':31,'y':9},{'x':32,'y':9},{'x':33,'y':9},{'x':34,'y':9},{'x':35,'y':9},{'x':36,'y':9},{'x':41,'y':9},{'x':42,'y':9},{'x':43,'y':9},{'x':44,'y':9},{'x':45,'y':9},{'x':55,'y':9},{'x':56,'y':9},{'x':57,'y':9},{'x':58,'y':9},{'x':59,'y':9},{'x':68,'y':9},{'x':69,'y':9},{'x':70,'y':9},{'x':71,'y':9},{'x':72,'y':9},{'x':2,'y':10},{'x':3,'y':10},{'x':4,'y':10},{'x':8,'y':10},{'x':9,'y':10},{'x':10,'y':10},{'x':11,'y':10},{'x':12,'y':10},{'x':13,'y':10},{'x':16,'y':10},{'x':17,'y':10},{'x':18,'y':10},{'x':19,'y':10},{'x':20,'y':10},{'x':23,'y':10},{'x':24,'y':10},{'x':25,'y':10},{'x':26,'y':10},{'x':27,'y':10},{'x':31,'y':10},{'x':32,'y':10},{'x':33,'y':10},{'x':34,'y':10},{'x':35,'y':10},{'x':36,'y':10},{'x':41,'y':10},{'x':42,'y':10},{'x':43,'y':10},{'x':44,'y':10},{'x':45,'y':10},{'x':55,'y':10},{'x':56,'y':10},{'x':57,'y':10},{'x':58,'y':10},{'x':59,'y':10},{'x':68,'y':10},{'x':69,'y':10},{'x':70,'y':10},{'x':71,'y':10},{'x':72,'y':10},{'x':1,'y':11},{'x':2,'y':11},{'x':3,'y':11},{'x':4,'y':11},{'x':5,'y':11},{'x':6,'y':11},{'x':7,'y':11},{'x':8,'y':11},{'x':9,'y':11},{'x':10,'y':11},{'x':11,'y':11},{'x':12,'y':11},{'x':13,'y':11},{'x':16,'y':11},{'x':17,'y':11},{'x':18,'y':11},{'x':19,'y':11},{'x':20,'y':11},{'x':23,'y':11},{'x':24,'y':11},{'x':25,'y':11},{'x':26,'y':11},{'x':27,'y':11},{'x':28,'y':11},{'x':29,'y':11},{'x':30,'y':11},{'x':31,'y':11},{'x':32,'y':11},{'x':33,'y':11},{'x':34,'y':11},{'x':35,'y':11},{'x':41,'y':11},{'x':42,'y':11},{'x':43,'y':11},{'x':44,'y':11},{'x':45,'y':11},{'x':46,'y':11},{'x':47,'y':11},{'x':48,'y':11},{'x':49,'y':11},{'x':50,'y':11},{'x':51,'y':11},{'x':52,'y':11},{'x':55,'y':11},{'x':56,'y':11},{'x':57,'y':11},{'x':58,'y':11},{'x':59,'y':11},{'x':60,'y':11},{'x':61,'y':11},{'x':62,'y':11},{'x':63,'y':11},{'x':64,'y':11},{'x':65,'y':11},{'x':68,'y':11},{'x':69,'y':11},{'x':70,'y':11},{'x':71,'y':11},{'x':72,'y':11},{'x':73,'y':11},{'x':74,'y':11},{'x':75,'y':11},{'x':76,'y':11},{'x':77,'y':11},{'x':78,'y':11},{'x':1,'y':12},{'x':2,'y':12},{'x':3,'y':12},{'x':4,'y':12},{'x':5,'y':12},{'x':6,'y':12},{'x':7,'y':12},{'x':8,'y':12},{'x':9,'y':12},{'x':10,'y':12},{'x':11,'y':12},{'x':12,'y':12},{'x':13,'y':12},{'x':16,'y':12},{'x':17,'y':12},{'x':18,'y':12},{'x':19,'y':12},{'x':20,'y':12},{'x':23,'y':12},{'x':24,'y':12},{'x':25,'y':12},{'x':26,'y':12},{'x':27,'y':12},{'x':28,'y':12},{'x':29,'y':12},{'x':30,'y':12},{'x':31,'y':12},{'x':32,'y':12},{'x':33,'y':12},{'x':34,'y':12},{'x':41,'y':12},{'x':42,'y':12},{'x':43,'y':12},{'x':44,'y':12},{'x':45,'y':12},{'x':46,'y':12},{'x':47,'y':12},{'x':48,'y':12},{'x':49,'y':12},{'x':50,'y':12},{'x':51,'y':12},{'x':52,'y':12},{'x':55,'y':12},{'x':56,'y':12},{'x':57,'y':12},{'x':58,'y':12},{'x':59,'y':12},{'x':60,'y':12},{'x':61,'y':12},{'x':62,'y':12},{'x':63,'y':12},{'x':64,'y':12},{'x':65,'y':12},{'x':68,'y':12},{'x':69,'y':12},{'x':70,'y':12},{'x':71,'y':12},{'x':72,'y':12},{'x':73,'y':12},{'x':74,'y':12},{'x':75,'y':12},{'x':76,'y':12},{'x':77,'y':12},{'x':78,'y':12},{'x':2,'y':13},{'x':3,'y':13},{'x':4,'y':13},{'x':5,'y':13},{'x':6,'y':13},{'x':7,'y':13},{'x':8,'y':13},{'x':9,'y':13},{'x':10,'y':13},{'x':11,'y':13},{'x':12,'y':13},{'x':16,'y':13},{'x':17,'y':13},{'x':18,'y':13},{'x':19,'y':13},{'x':20,'y':13},{'x':23,'y':13},{'x':24,'y':13},{'x':25,'y':13},{'x':26,'y':13},{'x':27,'y':13},{'x':28,'y':13},{'x':29,'y':13},{'x':30,'y':13},{'x':31,'y':13},{'x':32,'y':13},{'x':33,'y':13},{'x':41,'y':13},{'x':42,'y':13},{'x':43,'y':13},{'x':44,'y':13},{'x':45,'y':13},{'x':46,'y':13},{'x':47,'y':13},{'x':48,'y':13},{'x':49,'y':13},{'x':50,'y':13},{'x':51,'y':13},{'x':52,'y':13},{'x':55,'y':13},{'x':56,'y':13},{'x':57,'y':13},{'x':58,'y':13},{'x':59,'y':13},{'x':60,'y':13},{'x':61,'y':13},{'x':62,'y':13},{'x':63,'y':13},{'x':64,'y':13},{'x':65,'y':13},{'x':68,'y':13},{'x':69,'y':13},{'x':70,'y':13},{'x':71,'y':13},{'x':72,'y':13},{'x':73,'y':13},{'x':74,'y':13},{'x':75,'y':13},{'x':76,'y':13},{'x':77,'y':13},{'x':78,'y':13},{'x':3,'y':14},{'x':4,'y':14},{'x':5,'y':14},{'x':6,'y':14},{'x':7,'y':14},{'x':8,'y':14},{'x':9,'y':14},{'x':10,'y':14},{'x':16,'y':14},{'x':17,'y':14},{'x':18,'y':14},{'x':19,'y':14},{'x':20,'y':14},{'x':23,'y':14},{'x':24,'y':14},{'x':25,'y':14},{'x':26,'y':14},{'x':27,'y':14},{'x':28,'y':14},{'x':29,'y':14},{'x':30,'y':14},{'x':31,'y':14},{'x':41,'y':14},{'x':42,'y':14},{'x':43,'y':14},{'x':44,'y':14},{'x':45,'y':14},{'x':46,'y':14},{'x':47,'y':14},{'x':48,'y':14},{'x':49,'y':14},{'x':50,'y':14},{'x':51,'y':14},{'x':52,'y':14},{'x':55,'y':14},{'x':56,'y':14},{'x':57,'y':14},{'x':58,'y':14},{'x':59,'y':14},{'x':60,'y':14},{'x':61,'y':14},{'x':62,'y':14},{'x':63,'y':14},{'x':64,'y':14},{'x':65,'y':14},{'x':68,'y':14},{'x':69,'y':14},{'x':70,'y':14},{'x':71,'y':14},{'x':72,'y':14},{'x':73,'y':14},{'x':74,'y':14},{'x':75,'y':14},{'x':76,'y':14},{'x':77,'y':14},{'x':78,'y':14}]);

	var resize = function(){
		_canvas.width  = Elements.$content.width();
		_canvas.height = Elements.$content.height();

		Templating.stopAnimations();
		createParticles();
	};

	function feedback(intensity){
		var i, particle;
		// intensity = Math.max(intensity, 3);
		if (window.screen.availWidth > 1000) {
			intensity = intensity * 2 + 1;
		}

		intensity *= 1 + Math.random() * 0.4;

		// console.log(intensity);

		var canvasCenter = {
			x: _canvas.width / 2,
			y: _canvas.height / 2
		};

		var explodingRadius = Math.min(_canvas.width * 2 / 5, _canvas.width * intensity / 20);
		// _totalIterations =  Math.min(Math.floor(30 / intensity * 10), 80);

		for(i = 0; i < _particles.length; i++) {
			particle = _particles[i];
			particle.startPositionX = particle.x;
			particle.startPositionY = particle.y;
			particle.centerX = canvasCenter.x + Math.cos(Math.PI * 2 / _positions.length * i) * (Math.random() * intensity * 3 + explodingRadius);
			particle.centerY = canvasCenter.y + Math.sin(Math.PI * 2 / _positions.length * i) * (Math.random() * intensity * 3 + explodingRadius);
			particle.deltaPositionX = particle.centerX + Math.cos(particle.angle) * particle.circleRadius - particle.x;
			particle.deltaPositionY = particle.centerY + Math.sin(particle.angle) * particle.circleRadius - particle.y;
		}
		_currentIteration = _totalIterations;

		setTimeout(function() {
			for(var i = 0; i < _particles.length; i++) {
				var particle = _particles[i];
				particle.startPositionX = particle.x;
				particle.startPositionY = particle.y;
				particle.centerX = particle.initialX;
				particle.centerY = particle.initialY;
				particle.deltaPositionX = particle.centerX + Math.cos(particle.angle) * particle.circleRadius - particle.x;
				particle.deltaPositionY = particle.centerY + Math.sin(particle.angle) * particle.circleRadius - particle.y;
			}
			_currentIteration = _totalIterations;
		}, _totalIterations / 60 * 1000 + 400);
	}

	function createParticles(){
		var i, particle, initialX, initialY;

		_particles 		= [];
		_randomParticles = [];

		_context.fillStyle = '#fff';

		/** SidLee particles**/
		var numParticles = _positions.length * 2;
		for(i = 0; i < numParticles; i++){
			var scale 		= Math.min(_canvas.width / 80, _canvas.height / 15, 14),
				radiusScale = 3;

			if (scale < 11){
				radiusScale = 2;
			}

			initialX = (_positions[(i % _positions.length)].x + (Math.random() - 0.5) * 0.7) * scale + (_canvas.width / 2 - 80 * scale / 2);
			initialY = (_positions[(i % _positions.length)].y + (Math.random() - 0.5) * 0.7) * scale + (_canvas.height / 2 - 15 * scale / 2);

			particle = {
				x: 0,
				y: 0,
				angle: 0,
				speed: 0.15 * (0.5 - Math.random()),
				circleRadius: Math.random() * 4 + 1,
				initialX: initialX,
				initialY: initialY,
				centerX: initialX,
				centerY: initialY,
				radius: Math.random() * radiusScale + 0.5,
				alpha: Math.max(Math.random() * 0.75 + 0.1, 0.2)
			};

			_particles.push(particle);
		}

		/** Random particles **/
		for (i = 0; i < _randomParticlesNum; i++){
			initialX = Math.random() * _canvas.width;
			initialY = Math.random() * _canvas.height;

			_randomParticles.push({
				x: initialX,
				y: initialY,
				initialX: initialX,
				initialY: initialY,
				radius: Math.random() * 1.5 + 1,
				alpha: Math.max(0.1, Math.random() * 0.4),
				vx: Math.random() - 0.5,
				vy: Math.random() - 0.5
			});
		}

		loop();
	}

	function loop(){
		update();
		render();
		Templating.requestId = window.requestAnimFrame(loop);
	}

	function render(){
		var particle, i;
		_context.clearRect(0, 0, _canvas.width, _canvas.height);
		_.each([_particles, _randomParticles], function(particleArray) {
			for(var i = 0; i < particleArray.length; i++) {
				particle = particleArray[i];
				_context.globalAlpha = particle.alpha;
				_context.beginPath();
				_context.arc(particle.x, particle.y, particle.radius, 0, TWO_PI);
				_context.fill();
			}
		});
	}

	function ease(startValue, changeInValue, iterationPow) {
    return changeInValue * iterationPow + startValue;
	}

	function easeElastic(startValue, changeInValue, iterationRatio) {
		var s, a = 0.1, p = 0.4;
		if ( iterationRatio === 0 ) return 0;
		if ( iterationRatio === 1 ) return 1;
		if ( !a || a < 1 ) { a = 1; s = p / 4; }
		else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
		return startValue + changeInValue * ( a * Math.pow( 2, - 10 * iterationRatio) * Math.sin( ( iterationRatio - s ) * ( 2 * Math.PI ) / p ) + 1 );
	}

	function update() {
		var i, particle;
		if (_currentIteration > 0) {
			// var iterationPow = (-Math.pow(2, -10 * (_totalIterations - _currentIteration) / _totalIterations) + 1);
			var iterationRatio = (_totalIterations - _currentIteration) / _totalIterations;
			// should move particles to their destination
			for(i = 0; i < _particles.length; i++) {
				particle = _particles[i];
				particle.x = easeElastic(particle.startPositionX, particle.deltaPositionX, iterationRatio);
				particle.y = easeElastic(particle.startPositionY, particle.deltaPositionY, iterationRatio);
				// particle.x = ease(particle.startPositionX, particle.deltaPositionX, iterationPow);
				// particle.y = ease(particle.startPositionY, particle.deltaPositionY, iterationPow);
			}
			_currentIteration--;
		}
		else {
			for(i = 0; i < _particles.length; i++) {
				particle = _particles[i];
				particle.x = particle.centerX + Math.cos(particle.angle) * particle.circleRadius;
				particle.y = particle.centerY + Math.sin(particle.angle) * particle.circleRadius;
				particle.angle += particle.speed;
			}
		}


		for(i = 0; i < _randomParticles.length; i++) {
			particle = _randomParticles[i];
			particle.x += particle.vx;
			particle.y += particle.vy;

			if (particle.x > _canvas.width){
				particle.x = 0;
			}

			else if (particle.x < 0){
				particle.x = _canvas.width;
			}

			if (particle.y > _canvas.height){
				particle.y = 0;
			}

			else if (particle.y < 0) {
				particle.y = _canvas.height;
			}
		}
	}

	resize();

	resize = _.debounce(resize, 200);
	Elements.$window.on('resize', resize);

	return {
		feedback: feedback,
		title: title
	};
};
