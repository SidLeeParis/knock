Modules.graph = function() {
  var title = 'Intensity Graph',
    _canvas = document.getElementById('chart-canvas'),
		_particleCanvas = document.getElementById('particles-canvas'),
		_particleContext = _particleCanvas.getContext('2d'),
    _smoothie = new SmoothieChart({
      grid: {
        strokeStyle: 'transparent',
        verticalSections: 0,
        borderVisible: false,
        fillStyle: 'transparent'
      },
      labels: {
        disabled: true
      },
      millisPerPixel: 5,
      maxValue: 10,
      minValue: -8
    }),
    _intensityLine = new TimeSeries(),
    _randomParticlesNum = 200,
    TWO_PI = Math.PI * 2,
    _randomParticles = [];

  var resize = function() {
    _canvas.width = _particleCanvas.width = Elements.$content.width();
    _canvas.height = _particleCanvas.height = Elements.$content.height();

    Templating.stopAnimations();
    createParticles();
    loop();
  };

  function createParticles() {
    var i, initialX, initialY;
    _randomParticles = [];

		_particleContext.fillStyle = '#fff';

    for (i = 0; i < _randomParticlesNum; i++) {
      initialX = Math.random() * _particleCanvas.width;
      initialY = Math.random() * _particleCanvas.height;

      _randomParticles.push({
        x: initialX,
        y: initialY,
        initialX: initialX,
        initialY: initialY,
        radius: Math.random() * 1.5 + 1,
        alpha: Math.max(0.2, Math.random() * 0.8),
        vx: Math.random() - 0.5,
        vy: Math.random() - 0.5
      });
    }
  }

  function feedback(intensity) {
    return;
  }

  function update() {
    for (i = 0; i < _randomParticles.length; i++) {
      particle = _randomParticles[i];
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x > _particleCanvas.width) {
        particle.x = 0;
      } else if (particle.x < 0) {
        particle.x = _particleCanvas.width;
      }

      if (particle.y > _particleCanvas.height) {
        particle.y = 0;
      } else if (particle.y < 0) {
        particle.y = _particleCanvas.height;
      }
    }
  }

  function render() {
    var particle;
		_particleContext.clearRect(0, 0, _particleCanvas.width, _particleCanvas.height);
    for (var i = 0; i < _randomParticles.length; i++) {
      particle = _randomParticles[i];
      _particleContext.globalAlpha = particle.alpha;
      _particleContext.beginPath();
      _particleContext.arc(particle.x, particle.y, particle.radius, 0, TWO_PI);
      _particleContext.fill();
    }
  }

  function loop() {
    var intensity = Math.abs(_.last(Tracking.tracker.bounceIntensities)) || 0;
    _intensityLine.append(new Date()
      .getTime(), intensity);
    update();
    render();

    Templating.requestId = window.requestAnimFrame(loop);
  }


  _smoothie.addTimeSeries(_intensityLine, {
    lineWidth: '4',
    strokeStyle: '#FFF'
  });
  _smoothie.streamTo(_canvas, 50);

  resize();

  resize = _.debounce(resize, 200);
  Elements.$window.on('resize', resize);

  return {
    feedback: feedback,
    title: title
  };
};
