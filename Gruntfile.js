module.exports = function(grunt) {

  'use strict';

  var allJsFiles = [
    'public/js/**/*.js',
    'test/**/*.js',
    'config/**/*.js',
    'Gruntfile.js',
    'private/**/*.js',
    'server.js',
  ];

  require('jit-grunt')(grunt);
  grunt.initConfig({

    // check all js files for errors
    jshint: {
      all: allJsFiles,
    },

    // check your code against coding guidelines
    jscs: {
      all: allJsFiles,
    },

    concat: {
      dist: {
        src: [
          'public/bower_components/underscore/underscore-min.js',
          'public/bower_components/jquery/dist/jquery.min.js',
          'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
          'public/js/**/*.js',
        ],
        dest: 'public/dist/scripts.min.js',
      },
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/dist/style.min.css': 'public/styles/style.css',
        },
      },
    },

    karma: {
      // configs here override those in our existing karma.conf.js
      client: {
        configFile: 'tests/karma.conf.js',
      },
      travis: {
        singleRun: true,
        configFile: 'tests/karma.conf.js',
        browsers: ['PhantomJS'],
      },
    },

    shell: {
      testServer: {
        command: 'node_modules/istanbul/lib/cli.js cover --dir ./coverage/jasmine-node node_modules/jasmine-node/bin/jasmine-node -- tests/unit/server',
      },
      test: {
        command: 'node_modules/jasmine-node/bin/jasmine-node tests/unit/server',
      },
    },

    protractor: {
      dist: {
        options: {
          configFile: 'tests/protractor.conf.js',
          webdriverManagerUpdate: true,
        },
      },
    },

    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['public/styles/**/*.css'],
        tasks: ['cssmin'],
        options: {
          livereload: true,
        },
      },
      jsConcat: {
        files: ['public/js/**/*.js'],
        tasks: ['concat'],
        options: {
          livereload: true,
        },
      },
      qa: {
        files: allJsFiles,
        tasks: ['jshint', 'jscs'],
      },
      html: {
        files: ['public/**/*.html'],
        options: {
          livereload: true,
        },
      },
      config: {
        files: ['Gruntfile.js'],
        options: {
          reload: true,
        },
      },
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
        },
      },
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true,
      },
      dev: ['nodemon', 'watch', 'karma:client'],
      travis: ['nodemon'],
    },

    lcovMerge: {
      options: {
        outputFile: 'coverage/mergedLcov.info',
      },
      src: ['coverage/**/*.info'],
    },

  });

  grunt.registerTask('default', ['cssmin', 'jshint', 'jscs', 'concat', 'concurrent:dev']);
  grunt.registerTask('test', ['karma:travis', 'shell:testServer', 'lcovMerge']);
  grunt.registerTask('test-e2e', ['protractor']);
  grunt.registerTask('test-client', ['karma:client']);
  grunt.registerTask('test-server', ['shell:test']);
};
