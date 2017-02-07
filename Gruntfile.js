module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var env = process.env.ENV || 'development';

  grunt.initConfig({
    sass: {
      options: {
        sourcemap: "auto",
        trace: true,
        style: "expanded",
        lineNumbers: false
      },
      dist: {
        files: {
          'build/css/application.css': 'src/scss/application.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['src/**/*'],
        tasks: ['build']
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, src: 'src/robots.txt', dest: 'dist/' },
          { expand: true, cwd: 'src/images/', src: '**', dest: 'dist/assets/images/' },
          { expand: true, cwd: 'bower_components/font-awesome/fonts/', src: '**', dest: 'dist/assets/fonts/' },

          { expand: true, cwd: 'bower_components/lato/font/', src: 'lato-bold/*', dest: 'dist/assets/fonts/' },

          { expand: true, flatten: true, src: 'bower_components/jquery/dist/jquery.min.js', dest: 'dist/assets/js/' }
        ]
      }
    },
    includes: {
      files: {
        src: ['src/html/*.html'],
        dest: 'dist',
        flatten: true,
        cwd: '.',
        options: {
          silent: true,
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/application.min.css': ['build/css/application.css']
        }
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'dist/js/libs.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
          ],
          'dist/js/application.min.js': [
            'src/js/application.js'
          ]
        }
      }
    },
    environments: {
      environment: {
        options: {
          host: 'thalarion.be',
          username: 'florian',
          agent: process.env.SSH_AUTH_SOCK,

          local_path: 'dist',
          deploy_path: '/srv/http/headbang.re',
          releases_to_keep: 3
        }
      }
    },
    clean: ['dist/', 'build/']
  });

  grunt.loadNpmTasks('grunt-ssh-deploy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-includes');



  grunt.registerTask('build', ['sass', 'cssmin', 'uglify', 'copy', 'includes']);
  grunt.registerTask('default', ['clean', 'build', 'watch']);
  grunt.registerTask('deploy', ['clean', 'build', 'ssh_deploy:environment']);
}
