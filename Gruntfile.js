module.exports = function(grunt) {
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    watch: {
	    	options: {
	    		livereload: true
	    	},
	    	scripts: {
	    		files: ['assets/js/build/*.js', 'assets/js/build/modules/*.js'],
	    		tasks: ['concat', 'uglify'],
	    		options: {
	    			spawn: false
	    		}
	    	},
	    	styles: {
	    		files: ['assets/css/sass/*.scss', 'assets/css/sass/partials/*.scss'],
	    		tasks: ['sass', 'autoprefixer'],
	    		options: {
	    			spawn: false
	    		}
	    	}
	    },
	    concat: {
	    	options: {
	    		separator: grunt.util.linefeed,
				banner: '(function(){\n',
				footer: '\n})();'
	    	},
	    	dist: {
	    		src: [
	    			'assets/js/libs/*.js', 'assets/js/build/*.js', '!assets/js/build/templating.js', 'assets/js/build/modules/*.js', 'assets/js/build/templating.js'
	    		],
	    		dest: 'assets/js/prod.js'
	    	}

	    },
	    uglify: {
	    	build: {
	    		src: 'assets/js/prod.js',
	    		dest: 'assets/js/prod.min.js'
	    	}
	    },
	    jshint: {
	    	files: ['assets/js/build/*.js', 'assets/js/build/modules/*.js']
	    },
	    sass: {
	    	dist: {
	    		options: {
	    			style: 'compressed'
	    		},
	    		files: {
	    			'assets/css/prod.min.css': 'assets/css/sass/global.scss'
	    		}
	    	}
	    },
	    autoprefixer: {
	    	options: {
	    		browsers: ['last 3 versions', '> 1%']
	    	},
	    	dist: {
	    		files: {
	    			'assets/css/prod.min.css': 'assets/css/prod.min.css'
	    		}
	    	}
	    },
		htmllint: {
    		all: {
    			options: {
    				ignore: ['Start tag seen without seeing a doctype first. Expected "<!DOCTYPE html>".', 'Element "head" is missing a required instance of child element "title".']
    			},
    			src: ['index.html', 'assets/templates/*.html']
    		}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-html');
	grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'sass', 'autoprefixer', 'htmllint']);
};