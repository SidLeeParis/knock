module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },
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
      build: {
        src: ['dist']
      }
    },
    copy: {
      build: {
        cwd: 'src/assets',
        src: ['medias/**'],
        dest: 'dist',
        expand: true
      }
    },
    concat: {
      options: {
        separator: grunt.util.linefeed,
      },
      build: {
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
      build: {
        src: 'dist/js/prod.min.js',
        dest: 'dist/js/prod.min.js'
      }
    },
    sass: {
      all: {
        files: {
          'src/assets/css/prod.css': 'src/assets/css/sass/global.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions', '> 1%']
      },
      all: {
        files: {
          'src/assets/css/prod.css': 'src/assets/css/prod.css'
        }
      }
    },
    cssmin: {
      build: {
        files: {
          'dist/css/prod.min.css': ['src/assets/css/prod.css']
        }
      }
    },
    processhtml: {
      build: {
        files: [
          {
            cwd: 'src',
            src: ['*.html'],
            dest: 'dist/',
            expand: true
          },
          {
            cwd: 'src/templates',
            src: ['*.html'],
            dest: 'dist/templates',
            expand: true
          }
				]
      }
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          cwd: 'dist',
          src: ['*.html', 'templates/*.html'],
          dest: 'dist',
          expand: true
                }]
      }
    },
    jshint: {
      files: ['src/assets/js/*.js', '!src/assets/js/prod.js', 'src/assets/js/modules/*.js'],
      options: {
        expr: true,
        curly: true,
        eqeqeq: true,
        quotmark: true
      }
    }
  });

	grunt.loadNpmTasks('grunt-gh-pages');

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html');

  grunt.registerTask('serve', ['connect:server', 'watch']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['sass', 'autoprefixer', 'jshint']);

  grunt.registerTask('build', ['clean', 'copy', 'concat', 'uglify', 'cssmin', 'processhtml', 'htmlmin']);
  grunt.registerTask('run', ['build', 'connect:run']);
	grunt.registerTask('deploy', ['build', 'gh-pages']);
};
