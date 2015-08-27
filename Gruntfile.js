module.exports = function(grunt) {
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 9000,
					base: 'src',
					livereload: true,
					open: true
				}
			},
			run: {
				options: {
					port: 9000,
					base: 'dist',
					keepalive: true,
					open: true
				}
			}
		},
	    watch: {
	    	options: {
	    		livereload: true
	    	},
	    	scripts: {
	    		files: ['src/assets/js/*.js', 'src/assets/js/modules/*.js'],
	    		tasks: ['jshint'],
	    		options: {
	    			spawn: false
	    		}
	    	},
	    	styles: {
	    		files: ['src/assets/css/sass/*.scss', 'src/assets/css/sass/partials/*.scss'],
	    		tasks: ['sass', 'autoprefixer'],
	    		options: {
	    			spawn: false
	    		}
	    	}
	    },
		clean: {
			dist: {
				src: ['dist']
			}
		},
		copy: {
			dist: {
				cwd: 'src/assets',
				src: ['medias/**', 'css/prod.min.css'],
				dest: 'dist', 
				expand: true
			}
		},
	    concat: {
	    	options: {
	    		separator: grunt.util.linefeed,
	    	},
	    	dist: {
	    		src: [
	    			'src/assets/js/libs/*.js', 'src/assets/js/*.js', '!src/assets/js/templating.js', 'src/assets/js/modules/*.js', 'src/assets/js/templating.js'
	    		],
	    		dest: 'dist/js/prod.min.js'
	    	}
	    },
	    uglify: {
	    	options: {
	    		banner: '(function(){',
	    		footer: '})();'
	    	},
	    	dist: {
	    		src: 'dist/js/prod.min.js',
	    		dest: 'dist/js/prod.min.js'
	    	}
	    },
	    jshint: {
	    	files: ['src/assets/js/*.js', '!src/assets/js/prod.js', 'src/assets/js/modules/*.js']
	    },
	    sass: {
	    	all: {
	    		options: {
	    			style: 'compressed'
	    		},
	    		files: {
	    			'src/assets/css/prod.min.css': 'src/assets/css/sass/global.scss'
	    		}
	    	}
	    },
	    autoprefixer: {
	    	options: {
	    		browsers: ['last 3 versions', '> 1%']
	    	},
	    	all: {
	    		files: {
	    			'src/assets/css/prod.min.css': 'src/assets/css/prod.min.css'
	    		}
	    	}
	    },
		htmllint: {
    		all: {
    			options: {
    				ignore: ['Start tag seen without seeing a doctype first. Expected "<!DOCTYPE html>".', 'Element "head" is missing a required instance of child element "title".']
    			},
    			src: ['src/index.html', 'src/assets/templates/*.html']
    		}
		},
		processhtml: {
			all: {
				files: [
					{cwd: 'src', src: ['*.html'], dest: 'dist/', expand: true},
					{cwd: 'src/templates', src: ['*.html'], dest: 'dist/templates', expand: true}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-processhtml');

	grunt.registerTask('serve', ['connect:server', 'watch']);
	grunt.registerTask('lint', ['jshint', 'htmllint']);
	grunt.registerTask('default', ['sass', 'autoprefixer', 'jshint', 'htmllint']);

	grunt.registerTask('build', ['clean', 'copy', 'processhtml', 'concat', 'uglify']);
	grunt.registerTask('run', ['build', 'connect:run']);
	grunt.registerTask('heroku', ['build']);
};